package state

import (
	"github.com/Jaacky/typing-wars/communication"
	"github.com/Jaacky/typing-wars/types"
)

// Map struct
type Map struct {
	Bases map[string]*Base
	Units map[string]*Unit
}

// NewMap Initialization
func (m *Map) NewMap(clients *[]communication.Client) *Map {
	bases := make(map[string]*Base)

	// Hard coding 2 players only
	for i := 0; i < len(clients); i++ {
		client := clients[i]
		var point *types.Point
		if i == 0 {
			point = types.NewPoint(5, 50)
		} else {
			point = types.NewPoint(95, 50)
		}

		base := NewBase(client.ID, point)
		bases = append(bases, base)
	}

	return &Map{
		Bases: bases,
		Units: make(map[string]*Unit),
	}
}
