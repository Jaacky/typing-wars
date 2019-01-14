package typingwars

import (
	"testing"
)

func TestNewGame(t *testing.T) {
	room := NewRoom()
	game := NewGame(room)

	inGame := false
	if game.InGame {
		t.Errorf("New game should not be in game, want: %t, got: %t", inGame, game.InGame)
	}

	numberOfClients := 0
	numberOfTeams := 2
	if len(game.Clients) != numberOfClients {
		t.Errorf("New game, len(room.clients) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if len(game.Teams) != numberOfTeams {
		t.Errorf("New room, len(room.players) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}

	if len(room.playerStatuses) != numberOfClients {
		t.Errorf("New room, len(room.playerStatuses) doesn't match, want: %d, got: %d", numberOfClients, len(room.clients))
	}
}
