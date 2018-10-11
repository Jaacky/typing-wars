package typingwars

import (
	"time"

	"github.com/Jaacky/typing-wars/constants"
)

type UnitSpawner struct {
	eventDispatcher *EventDispatcher
}

func NewUnitSpawner(dispatcher *EventDispatcher) *UnitSpawner {
	return &UnitSpawner{
		eventDispatcher: dispatcher,
	}
}

func (spawner *UnitSpawner) Run() {
	for range time.Tick(constants.UnitSpawningInterval) {
		unit := NewUnit("hello world", 1, 1)
		event := &UnitSpawned{
			Unit: unit,
		}
		spawner.eventDispatcher.FireUnitSpawned(event)
	}
}
