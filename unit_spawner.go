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
}

func NewUnitSpawner(dispatcher *EventDispatcher) *UnitSpawner {
	return &UnitSpawner{
		eventDispatcher: dispatcher,
	}
}

func (spawner *UnitSpawner) Run(space *Space) {
	id, err := uuid.NewV4()
	if err != nil {
		log.Fatalf("Failed to generate uuid: %v", err)
	}
	testTarget := NewBase(id, types.NewPoint(50, 50))

	for range time.Tick(constants.UnitSpawningInterval) {
		log.Println("Spawning unit")
		for _, base := range space.Bases {
			log.Println("New unit")
			unit := NewUnit(base.Owner, "hello world", base.Position, 2, testTarget)
			event := &UnitSpawned{
				Unit: unit,
			}
			log.Println("New unit event complete, about to fire")
			spawner.eventDispatcher.FireUnitSpawned(event)
		}
	}
}
