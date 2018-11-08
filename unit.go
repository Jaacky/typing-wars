package typingwars

import (
	"github.com/Jaacky/typingwars/pb"
	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
)

// Unit struct describes a word unit
type Unit struct {
	Owner    uuid.UUID
	Size     uint32
	Position *types.Point
	Word     string
	Typed    uint32
	Speed    float32
	Target   *Base
}

func NewUnit(id uuid.UUID, word string, position *types.Point, speed float32, target *Base) *Unit {
	return &Unit{
		Owner:    id,
		Size:     3,
		Position: position,
		Word:     word,
		Typed:    0,
		Speed:    speed,
		Target:   target,
	}
}

func (unit *Unit) ToProto() *pb.Unit {
	return &pb.Unit{
		Owner:    unit.Owner.String(),
		Size:     unit.Size,
		Position: unit.Position.ToProto(),
		Word:     unit.Word,
		Typed:    unit.Typed,
		Speed:    unit.Speed,
		Target:   unit.Target.ToProto(),
	}
}
