package typingwars

import (
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/Jaacky/typingwars/pb"
	"github.com/golang/protobuf/proto"

	"github.com/gofrs/uuid"
	"github.com/gorilla/websocket"
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

type ClientJoinRoomError struct {
	AttemptedRoomID uuid.UUID
	Msg             string
}

func (err *ClientJoinRoomError) Error() string {
	return fmt.Sprintf("Failed to join room %s : %s", err.AttemptedRoomID, err.Msg)
}

type Client struct {
	ID     uuid.UUID
	Conn   *websocket.Conn
	Server *Server
	Room   *Room

	// Buffered channel of outbound messages.
	send chan *[]byte
	done chan bool

	Player *Player
}

func NewClient(conn *websocket.Conn, server *Server) *Client {
	id, err := uuid.NewV4()
	if err != nil {
		log.Fatalf("Failed to generate uuid: %v", err)
	}

	return &Client{
		ID:     id,
		Conn:   conn,
		Server: server,
		send:   make(chan *[]byte, 256),
		done:   make(chan bool),
	}
}

func (client *Client) SetRoom(room *Room) error {
	if client.Room != nil {
		return &ClientJoinRoomError{
			AttemptedRoomID: room.ID,
			Msg:             fmt.Sprintf("Already in room %s", client.Room.ID),
		}
	}

	client.Room = room
	return nil
}

func (client *Client) Listen() {
	go client.listenRead()
	client.listenWrite()

}

func (client *Client) listenRead() {
	defer func() {
		// TODO: Check and remove client from room
		client.Server.removeClient(client)
		client.Conn.Close()
	}()

	client.Conn.SetReadLimit(maxMessageSize)
	client.Conn.SetReadDeadline(time.Now().Add(pongWait))
	client.Conn.SetPongHandler(func(string) error { client.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		select {
		case <-client.done:
			client.done <- true
			return
		default:
			client.readFromWebSocket()
		}
	}
}

func (client *Client) readFromWebSocket() {
	messageType, data, err := client.Conn.ReadMessage()
	if err != nil {
		log.Println(err)
		client.done <- true
	} else if messageType != websocket.BinaryMessage {
		log.Printf("Non binary message received, ignoring. Type: %d\n", messageType)
	} else {
		client.unmarshalUserMessage(data)
	}
}

func (client *Client) unmarshalUserMessage(data []byte) {
	userMessage := &pb.UserMessage{}

	if err := proto.Unmarshal(data, userMessage); err != nil {
		log.Fatalln("Failed to parse user message")
		return
	}

	switch userMessageType := userMessage.Content.(type) {
	case *pb.UserMessage_UserAction:
		log.Println("UserMessage - UserAction")
		room := client.Room
		if !room.InGame {
			log.Println("Warning - UserMessage - UserAction received but not in game")
			return
		}
		userInput := userMessage.GetUserAction().GetUserInput()
		log.Printf("User input: %v", userInput)
		room.game.EventDispatcher.FireUserAction(&UserAction{Owner: client.ID, Key: "a"})
	case *pb.UserMessage_CreateRoomRequest:
		log.Println("UserMessage - CreateRoomRequest")
		client.Server.createRoomCh <- &createRoomRequest{
			clientID: client.ID,
			username: userMessage.GetCreateRoomRequest().GetUsername(),
		}
	case *pb.UserMessage_JoinRoomRequest:
		log.Println("UserMessage - JoinRoomRequest")
		request := userMessage.GetJoinRoomRequest()
		roomID, err := uuid.FromString(request.GetRoomId())
		if err != nil {
			// TODO: Return error to client
			log.Println("Join Room Request - Unable to parse ID from string")
			return
		}
		client.Server.joinRoomCh <- &joinRoomRequest{
			roomID:   roomID,
			clientID: client.ID,
			username: request.GetUsername(),
		}
	case *pb.UserMessage_UpdatePlayerReady:
		log.Println("UserMessage - ReadyPlayer")
		client.Room.updatePlayerReady(client.ID, userMessage.GetUpdatePlayerReady().GetReadyStatus())
	case *pb.UserMessage_StartGameRequest:
		client.Room.start()
	case *pb.UserMessage_RegisterPlayer:
		log.Println("UserMessage - RegisterPlayer")
		client.tryToRegisterPlayer(userMessage.GetRegisterPlayer())
	default:
		log.Printf("Unknown message type %T\n", userMessageType)
	}
}

func (client *Client) tryToRegisterPlayer(registerPlayerMsg *pb.RegisterPlayer) {
	username := strings.TrimSpace(registerPlayerMsg.GetUsername())
	log.Printf("Registering player: %s\n", username)
}

func (client *Client) listenWrite() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		// TODO: Check and remove client from room
		ticker.Stop()
		client.Server.removeClient(client)
		client.Conn.Close()
	}()

	for {
		select {
		case <-client.done:
			client.done <- true
			return
		case message, ok := <-client.send:
			client.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				client.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				client.done <- true
				return
			}

			err := client.Conn.WriteMessage(websocket.BinaryMessage, *message)
			if err != nil {
				log.Println("Client error writing message")
			}
			// w, err := client.Conn.NextWriter(websocket.TextMessage)
			// if err != nil {
			// 	client.done <- true
			// 	return
			// }
			// w.Write(message)

			// // Add queued chat messages to the current websocket message.
			// n := len(client.send)
			// for i := 0; i < n; i++ {
			// 	w.Write(newline)
			// 	w.Write(<-client.send)
			// }

			// if err := w.Close(); err != nil {
			// 	client.done <- true
			// 	return
			// }
		case <-ticker.C:
			client.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := client.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				client.done <- true
				return
			}
		}
	}
}

func marshalMessage(message proto.Message) *[]byte {
	bytes, err := proto.Marshal(message)
	if err != nil {
		panic(err)
	}

	return &bytes
}

func (client *Client) SendMessage(message proto.Message) {
	log.Printf("Sending message to client %s, message: %s\n", client.ID.String(), message.String())

	select {
	// case client.send <- []byte(message):
	case client.send <- marshalMessage(message):
	default:
		log.Printf("Default send message action")
	}
}
