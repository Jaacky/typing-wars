package supervisor

import (
	"fmt"
	"log"

	"github.com/Jaacky/typing-wars/communication"
	"github.com/gofrs/uuid"
)

type Room struct {
	ID      uuid.UUID
	clients map[uuid.UUID]*communication.Client
}

func NewRoom() *Room {
	id, err := uuid.NewV4()
	if err != nil {
		log.Fatalf("Failed to generate uuid: %v", err)
	}

	return &Room{
		ID:      id,
		clients: make(map[uuid.UUID]*communication.Client),
	}
}

func (room *Room) addClient(client *communication.Client) {
	room.clients[client.ID] = client
	room.SendToAllClients(fmt.Sprintf("Player %d has joined the game\n", client.ID))
}

func (room *Room) SendToClient(clientID uuid.UUID, message string) {
	client, ok := room.clients[clientID]
	if ok {
		client.SendMessage(message)
	} else {
		log.Printf("Client %d not found\n", clientID)
		return
	}
}

func (room *Room) SendToAllClients(message string) {
	for _, client := range room.clients {
		client.SendMessage(message)
	}
}
