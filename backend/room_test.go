package typingwars

import (
	"testing"

	"github.com/gofrs/uuid/v3"
)

func TestNewRoom(t *testing.T) {
	room := NewRoom()

	inGame := false
	if room.InGame {
		t.Errorf("New room should not be in game, want: %t, got: %t", inGame, room.InGame)
	}

	if room.game != nil {
		t.Errorf("New room should not have game")
	}

	numberOfClients := 0
	if len(room.clients) != numberOfClients {
		t.Errorf("New room, len(room.clients) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if room.totalPlayers != int32(numberOfClients) {
		t.Errorf("New room, room.totalPlayers doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if len(room.players) != numberOfClients {
		t.Errorf("New room, len(room.players) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if len(room.playerStatuses) != numberOfClients {
		t.Errorf("New room, len(room.playerStatuses) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}
}

func mockClient(id uuid.UUID) *Client {
	return &Client{
		ID:     id,
		Conn:   nil,
		Server: nil,
		Room:   nil,

		send: make(chan *[]byte, 256),
		done: make(chan bool),
	}
}

func TestAddClient(t *testing.T) {
	room := NewRoom()

	username := "testClient"
	client := mockClient(uuid.UUID{})

	room.addClient(client, username)

	numberOfClients := 1
	if len(room.clients) != numberOfClients {
		t.Errorf("len(room.clients) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if room.totalPlayers != int32(numberOfClients) {
		t.Errorf("room.totalPlayers doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if len(room.players) != numberOfClients {
		t.Errorf("len(room.players) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if len(room.playerStatuses) != numberOfClients {
		t.Errorf("len(room.playerStatuses) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	playerStatusReady := false
	playerStatusIndex := int32(0)
	if room.playerStatuses[client.ID].ready != playerStatusReady {
		t.Errorf("Newly added client's ready status doesn't match, want: %t, got: %t", playerStatusReady, room.playerStatuses[client.ID].ready)
	}

	if room.playerStatuses[client.ID].index != playerStatusIndex {
		t.Errorf("Newly added client's ready status doesn't match, want: %d, got: %d", playerStatusIndex, room.playerStatuses[client.ID].index)
	}
}

func TestUpdatePlayerReady(t *testing.T) {
	room := NewRoom()

	username := "testClient"
	id := uuid.UUID{}
	client := mockClient(id)
	readyStatus := true

	room.addClient(client, username)
	room.updatePlayerReady(id, readyStatus)

	if room.playerStatuses[id].ready != readyStatus {
		t.Errorf("After update player ready, ready status doesn't match, want: %t, got: %t", readyStatus, room.playerStatuses[id].ready)
	}
}
