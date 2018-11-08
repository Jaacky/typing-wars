package typingwars

import (
	"log"
	"time"

	"github.com/Jaacky/typingwars/constants"
	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
)

type UnitSpawner struct {
	eventDispatcher *EventDispatcher
	space           *Space
	teams           []*Team
}

func NewUnitSpawner(dispatcher *EventDispatcher, space *Space, teams []*Team) *UnitSpawner {
	return &UnitSpawner{
		eventDispatcher: dispatcher,
		space:           space,
		teams:           teams,
	}
}

func (spawner *UnitSpawner) Run() {
	id, err := uuid.NewV4()
	if err != nil {
		log.Fatalf("Failed to generate uuid: %v", err)
	}
	testTarget := NewBase(id, types.NewPoint(95, 50))
	word := "a"
	for range time.Tick(constants.UnitSpawningInterval) {
		log.Println("Spawning unit")
		for _, base := range spawner.space.Bases {
			log.Println("New unit")
			unit := NewUnit(base.Owner, word, base.Position, 1, testTarget)
			word += "a"
			event := &UnitSpawned{
				Unit: unit,
			}
			log.Println("New unit event complete, about to fire")
			spawner.eventDispatcher.FireUnitSpawned(event)
		}
	}
}
