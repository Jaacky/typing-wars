package typingwars

import (
	"github.com/Jaacky/typingwars/backend/constants"
	"github.com/Jaacky/typingwars/backend/pb"
	"github.com/Jaacky/typingwars/backend/types"
	"github.com/gofrs/uuid"
)

// Base struct
type Base struct {
	ObjectState
	Hp     int32
	Colour string
}

// NewBase initialization
func NewBase(ownerID uuid.UUID, position *types.Point) *Base {
	objectState := NewObjectState(ownerID, constants.BaseSize, position)
	return &Base{
		ObjectState: *objectState,
		Hp:          constants.BaseHp,
		Colour:      "#fff",
	}
}

func (base *Base) ToProto() *pb.Base {
	return &pb.Base{
		Owner:    base.Owner().String(),
		Size:     base.Size(),
		Hp:       base.Hp,
		Colour:   base.Colour,
		Position: base.Position().ToProto(),
	}
}
