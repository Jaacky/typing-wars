package typingwars

import (
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

type Client struct {
	ID   uuid.UUID
	Conn *websocket.Conn
	Room *Room

	// Buffered channel of outbound messages.
	send chan []byte
	done chan bool

	Player *Player
}

func NewClient(conn *websocket.Conn, room *Room) *Client {
	id, err := uuid.NewV4()
	if err != nil {
		log.Fatalf("Failed to generate uuid: %v", err)
	}

	return &Client{
		ID:   id,
		Conn: conn,
		Room: room,
		send: make(chan []byte, 256),
		done: make(chan bool),
	}
}

func (client *Client) Listen() {
	go client.listenRead()
	client.listenWrite()

}

func (client *Client) listenRead() {
	defer func() {
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

func (client *Client) listenWrite() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
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

			w, err := client.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				client.done <- true
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(client.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-client.send)
			}

			if err := w.Close(); err != nil {
				client.done <- true
				return
			}
		case <-ticker.C:
			client.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := client.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				client.done <- true
				return
			}
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
	case *pb.UserMessage_JoinGame:
		log.Println("UserMessage - JoinGame")
	case *pb.UserMessage_RegisterPlayer:
		log.Println("UserMessage - RegisterPlayer")
		client.tryToRegisterPlayer(userMessage.GetRegisterPlayer())
	default:
		log.Printf("Unknown message type %T\n", userMessageType)
	}
}

func (client *Client) tryToRegisterPlayer(registerPlayerMsg *pb.RegisterPlayer) {
	username := strings.TrimSpace(registerPlayerMsg.Username)
	log.Printf("Registering player: %s\n", username)
}

func (client *Client) SendMessage(message string) {
	log.Printf("Sending message to client %d, message: %s\n", client.ID, message)

	select {
	case client.send <- []byte(message):
	default:
		log.Printf("Default send message action")
	}
}
