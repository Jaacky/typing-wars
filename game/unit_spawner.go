package game

import (
	"time"

	"github.com/Jaacky/typing-wars/constants"
	"github.com/Jaacky/typing-wars/events"
	"github.com/Jaacky/typing-wars/state"
)

type UnitSpawner struct {
	eventDispatcher *events.EventDispatcher
}

func NewUnitSpawner(dispatcher *events.EventDispatcher) *UnitSpawner {
	return &UnitSpawner{
		eventDispatcher: dispatcher,
	}
}

func (spawner *UnitSpawner) Run() {
	for range time.Tick(constants.UnitSpawningInterval) {
		unit := state.NewUnit("hello world", 1, 1)
		event := &events.UnitSpawned{
			Unit: unit,
		}
		spawner.eventDispatcher.FireUnitSpawned(event)
	}
}
