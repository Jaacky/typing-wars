package typingwars

import (
	"github.com/Jaacky/typing-wars/types"
	"github.com/gofrs/uuid"
)

// Base struct
type Base struct {
	Owner    uuid.UUID
	HP       int32
	Colour   string
	Position *types.Point
}

// NewBase initialization
func NewBase(ownerID uuid.UUID, position *types.Point) *Base {
	return &Base{
		Owner:    ownerID,
		HP:       50,
		Colour:   "#fff",
		Position: position,
	}
}
