package typingwars

import (
	"log"
	"net/http"

	"github.com/gofrs/uuid/v3"
	"github.com/gorilla/websocket"
)

type createRoomRequest struct {
	clientID uuid.UUID
	username string
}

type joinRoomRequest struct {
	clientID uuid.UUID
	username string
	roomID   uuid.UUID
}

type Server struct {
	rooms    map[uuid.UUID]*Room
	clients  map[uuid.UUID]*Client
	upgrader *websocket.Upgrader

	createRoomCh chan *createRoomRequest
	joinRoomCh   chan *joinRoomRequest
}

func NewServer() *Server {
	return &Server{
		rooms:   make(map[uuid.UUID]*Room),
		clients: make(map[uuid.UUID]*Client),
		upgrader: &websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin:     func(r *http.Request) bool { return true },
		},
		createRoomCh: make(chan *createRoomRequest),
		joinRoomCh:   make(chan *joinRoomRequest),
	}
}

func (server *Server) addRoom(room *Room) {
	server.rooms[room.ID] = room
}

func (server *Server) addClient(client *Client) {
	server.clients[client.ID] = client
}

func (server *Server) removeClient(client *Client) {
	delete(server.clients, client.ID)
	room := client.Room
	if room != nil {
		roomEmpty := room.removeClient(client.ID)
		if roomEmpty {
			delete(server.rooms, room.ID)
		}
	}
}

func (server *Server) Listen() {
	connect := func(w http.ResponseWriter, r *http.Request) {
		log.Println("Client attempting connection")
		conn, err := server.upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}

		log.Println("Client connection established")
		client := NewClient(conn, server)
		server.addClient(client)
		client.Listen()
	}

	http.HandleFunc("/connect", connect)

	go server.manageRooms()
	log.Println("End of serverlisten")
}

func (server *Server) manageRooms() {
	for {
		select {
		case request := <-server.createRoomCh:
			log.Printf("Client %s %s creating room", request.username, request.clientID)
			client := server.clients[request.clientID]
			room := NewRoom()
			err := client.SetRoom(room)
			if err != nil {
				// TODO: Return room error to client
				log.Println(err)
			} else {
				server.addRoom(room)
				room.addClient(client, request.username)
			}
		case request := <-server.joinRoomCh:
			log.Printf("Client %s %s joining room %s", request.username, request.clientID, request.roomID)
			client := server.clients[request.clientID]
			room, ok := server.rooms[request.roomID]
			if ok {
				err := client.SetRoom(room)
				if err != nil {
					// TODO: Return room error to client
					log.Println(err)
					client.done <- true
				} else {
					room.addClient(client, request.username)
				}
			} else {
				// TODO: Room does not exist, return room error to client
				log.Println("Room does not exist")
				client.done <- true
			}

		}
	}
}
