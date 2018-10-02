package state

import "github.com/Jaacky/typing-wars/types"

// Base struct
type Base struct {
	Owner    string
	HP       int32
	Colour   string
	Position *types.Point
}

// NewBase initialization
func (base *Base) NewBase(ownerID string, position *types.Point) *Base {
	return &Base{
		Owner:    ownerID,
		HP:       50,
		Colour:   "#fff",
		Position: position,
	}
}
