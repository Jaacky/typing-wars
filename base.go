package typingwars

import (
	"github.com/Jaacky/typingwars/pb"
	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
)

// Base struct
type Base struct {
	Owner    uuid.UUID
	Size     uint32
	Hp       int32
	Colour   string
	Position *types.Point
}

// NewBase initialization
func NewBase(ownerID uuid.UUID, position *types.Point) *Base {
	return &Base{
		Owner:    ownerID,
		Size:     6,
		Hp:       50,
		Colour:   "#fff",
		Position: position,
	}
}

func (base *Base) ToProto() *pb.Base {
	return &pb.Base{
		Owner:    base.Owner.String(),
		Size:     base.Size,
		Hp:       base.Hp,
		Colour:   base.Colour,
		Position: base.Position.ToProto(),
	}
}
