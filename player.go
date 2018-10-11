package typingwars

import (
	"github.com/gofrs/uuid"
)

type Player struct {
	ID       uuid.UUID
	Username string
}

func NewPlayer(id uuid.UUID, username string) *Player {
	return &Player{
		ID:       id,
		Username: username,
	}
}
