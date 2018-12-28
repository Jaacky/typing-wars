package typingwars

import (
	"github.com/Jaacky/typingwars/backend/pb"
	"github.com/gofrs/uuid/v3"
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
