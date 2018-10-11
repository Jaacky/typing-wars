package typingwars

import (
	"github.com/Jaacky/typing-wars/types"
	"github.com/gofrs/uuid"
)

// Map struct
type Map struct {
	Bases map[uuid.UUID]*Base
	Units map[uuid.UUID]*Unit
}

// NewMap Initialization
func (m *Map) NewMap(clients map[uuid.UUID]*Client) *Map {
	bases := make(map[uuid.UUID]*Base)

	i := 0
	// Hard coding 2 players only
	for _, client := range clients {
		var point *types.Point
		if i == 0 {
			point = types.NewPoint(5, 50)
		} else {
			point = types.NewPoint(95, 50)
		}

		base := NewBase(client.ID, point)
		bases[client.ID] = base
		i++

	}

	return &Map{
		Bases: bases,
		Units: make(map[uuid.UUID]*Unit),
	}
}
