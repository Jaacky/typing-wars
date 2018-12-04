package typingwars

import (
	"github.com/Jaacky/typingwars/pb"
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

func (player *Player) ToProto() *pb.Player {
	return &pb.Player{
		Id:       player.ID.String(),
		Username: player.Username,
	}
}
