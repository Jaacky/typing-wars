// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

// hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client

	gameRooms map[string]*gameRoom

	openGameRoom  chan *gameRoom
	closeGameRoom chan *gameRoom
}

func newHub() *Hub {
	return &Hub{
		broadcast:     make(chan []byte),
		register:      make(chan *Client),
		unregister:    make(chan *Client),
		clients:       make(map[*Client]bool),
		openGameRoom:  make(chan *gameRoom),
		closeGameRoom: make(chan *gameRoom),
		gameRooms:     make(map[string]*gameRoom),
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			// Allow collection of memory referenced by the caller by doing all work in
			// new goroutines.
			go client.writePump()
			go client.readPump()
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case gameRoom := <-h.openGameRoom:
			// fmt.Printf("Gameroom: %v, Gameroom.players: %v, gameRoom.players[0].nickname: %s", gameRoom, gameRoom.players, gameRoom.players[0].nickname)
			// fmt.Printf("Game room created: %s", gameRoom.id)
			h.gameRooms[gameRoom.id] = gameRoom
		case gameRoom := <-h.closeGameRoom:
			if _, ok := h.gameRooms[gameRoom.id]; ok {
				delete(h.gameRooms, gameRoom.id)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}
