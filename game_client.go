package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	uuid "github.com/satori/go.uuid"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	ID  string
	hub *Hub

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte

	player *Player
	room   *gameRoom
}

type message struct {
	MessageType string
	Data        interface{}
}

func createClient(hub *Hub, conn *websocket.Conn) (*Client, error) {
	clientID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong creating client UUID: %s", err)
		return nil, err
	}

	return &Client{ID: clientID.String(), hub: hub, conn: conn, send: make(chan []byte, 256)}, nil
}

// readPump pumps messages from the websocket connection to the hub.
//
// The application runs readPump in a per-connection goroutine. The application
// ensures that there is at most one reader on a connection by executing all
// reads from this goroutine.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		var msg map[string]interface{}
		err := c.conn.ReadJSON(&msg)
		if err != nil {
			fmt.Printf("Socket error: %v\n", err)
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		fmt.Printf("Message received: %v\n", msg)
		switch msg["MessageType"] {
		case createGameRoomMessageType:
			c.createGameRoom(msg)
		case enterGameRoomMessageType:
			c.enterGameRoom(msg)
		case playerReadyMessageType:
			c.ready(msg)
		default:
			fmt.Printf("Other message types: %v\n", msg["MessageType"])
		}
		// fmt.Printf("Client readPump msg type: %v\n", msg["MessageType"])
		// msgData := msg[messageData].(map[string]interface{})
		// fmt.Printf("Data: %v, Data['nickname']: %v\n", msgData, msgData[messageDataNickname])

		// message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		// c.hub.broadcast <- message
	}
}

// writePump pumps messages from the hub to the websocket connection.
//
// A goroutine running writePump is started for each connection. The
// application ensures that there is at most one writer to a connection by
// executing all writes from this goroutine.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (c *Client) ready(msg map[string]interface{}) {
	msgData := msg[messageData].(map[string]interface{})
	readyFlag := msgData[messageReadyFlag].(bool)
	fmt.Printf("msgData: %v, readyFlag: %v\n", msgData, readyFlag)
	fmt.Printf("Client ready toggle: %s - status: %v", c.player.Nickname, readyFlag)

	// otherClients := c.room.getOtherClients(c.ID)
	otherClients := c.room.getOtherClients(c.ID)
	clients := c.room.getClients()
	fmt.Printf("Other clients: %v, len: %v, cap: %v\n", otherClients, len(otherClients), cap(otherClients))

	if len(otherClients) != 0 {
		readyStatus := c.room.readyStatus
		readyStatus[c.ID] = readyFlag
		for _, client := range clients {
			responseData := make(map[string]interface{})
			responseData[messageDataPlayerID] = c.ID
			responseData[messageReadyFlag] = readyFlag
			responseData[messageReadyStatus] = readyStatus
			response := message{MessageType: otherPlayersReadyMessageType, Data: responseData}
			fmt.Printf("Ready res message: %v\n", response)
			json, err := json.Marshal(response)
			if err != nil {
				fmt.Printf("Something went wrong marshalling response to json, %s", err)
			}
			client.send <- json
		}
	}
}

func (c *Client) createGameRoom(msg map[string]interface{}) {
	fmt.Printf("Message received - type is createGameRoom\n")

	msgData := msg[messageData].(map[string]interface{})
	nickname := msgData[messageDataNickname].(string)

	p1 := createPlayer(c.ID, nickname)

	gameRoom, gameRoomCreationErr := createGameRoom()
	if gameRoomCreationErr != nil {
		fmt.Printf("Something went wrong creating game room: %s", gameRoomCreationErr)
	}

	c.player = p1
	c.room = gameRoom
	gameRoom.addClient(c)
	c.hub.openGameRoom <- gameRoom

	responseData := make(map[string]interface{})
	responseData[messageDataRoomID] = gameRoom.id
	responseData[messageDataPlayerID] = p1.ID
	responseData[messageDataNickname] = nickname
	responseData[messageDataPlayers] = gameRoom.getPlayers()
	responseData[messageReadyStatus] = gameRoom.readyStatus
	responseData[messageCanStart] = false
	response := message{MessageType: createGameRoomSuccessMessageType, Data: responseData}
	// j, _ := json.Marshal(responseData)
	// fmt.Printf("j: %v\n", j)
	fmt.Printf("Creating game room response msg: %v\n", response)
	json, err := json.Marshal(response)
	if err != nil {
		fmt.Printf("Something went wrong marshalling response to json, %s", err)
	}
	// fmt.Printf("about to send json after creating game room: JSON: %v, response: %v\n", json, response)
	c.send <- json
}

func (c *Client) enterGameRoom(msg map[string]interface{}) {
	fmt.Printf("Message type is enterGameRoomMessageType\n")

	msgData := msg[messageData].(map[string]interface{})
	// fmt.Printf("msgData from enterGame: %v\n", msgData)
	nickname := msgData[messageDataNickname].(string)
	// fmt.Printf("nickname from enterGameRoom: %v\n", nickname)
	gameID := msgData["gameId"].(string)
	// if gameIDErr != nil {
	// 	fmt.Printf("Somethign went wrong with getting UUID from string, %s\n", err)
	// }

	p2 := createPlayer(c.ID, nickname)

	fmt.Printf("Game rooms: %v\n", c.hub.gameRooms)
	if room, ok := c.hub.gameRooms[gameID]; ok {
		c.player = p2
		c.room = room
		room.addClient(c)
		fmt.Printf("from entering game room GameRoom: %v\n", room)
		responseData := make(map[string]interface{})
		responseData[messageDataRoomID] = room.id
		responseData[messageDataPlayerID] = p2.ID
		responseData[messageDataNickname] = nickname
		responseData[messageDataPlayers] = room.getPlayers()
		responseData[messageReadyStatus] = room.readyStatus
		responseData[messageCanStart] = false
		response := message{enterGameRoomSuccessMessageType, responseData}

		fmt.Printf("Entering game room response msg: %v\n", response)
		jsonMessage, err := json.Marshal(response)
		if err != nil {
			fmt.Printf("Something went wrong marshalling response to json, %s", err)
		}
		fmt.Printf("Entering game room JSON response msg: %s\n", jsonMessage)
		c.send <- jsonMessage

		otherResponseData := make(map[string]interface{})
		otherResponseData[messageDataPlayers] = room.getPlayers()
		otherResponseData[messageReadyStatus] = room.readyStatus
		otherResponse := message{newPlayerJoinedGameRoomMessageType, otherResponseData}

		otherJSON, err := json.Marshal(otherResponse)
		if err != nil {
			fmt.Printf("Something went wrong marshalling response to json, %s", err)
		}
		room.clients[0].send <- otherJSON
	} else {
		fmt.Printf("Room does not exist\n")
	}
}
