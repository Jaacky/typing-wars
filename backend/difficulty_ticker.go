package typingwars

import (
	"log"
	"time"

	"github.com/Jaacky/typingwars/backend/constants"
)

type DifficultyTicker struct {
	eventDispatcher *EventDispatcher
	space           *Space
	teams           []*Team
	unitSpawners    map[time.Duration]*UnitSpawner
	stop            chan bool
}

func NewDifficultyTicker(stop chan bool, dispatcher *EventDispatcher, space *Space, teams []*Team) *DifficultyTicker {
	return &DifficultyTicker{
		eventDispatcher: dispatcher,
		space:           space,
		teams:           teams,
		unitSpawners:    make(map[time.Duration]*UnitSpawner),
		stop:            stop,
	}
}

func (ticker *DifficultyTicker) Run() {
	for range time.Tick(constants.DifficultyIncreaseInterval) {
		select {
		case <-ticker.stop:
			log.Println("Difficulty spawner stopped")
			for _, spawner := range ticker.unitSpawners {
				spawner.stop <- true
			}
			return
		default:
			log.Println("Difficulty ticker - increasing spawn speed")
			spawnSpeed := constants.UnitSpawningInterval / 2
			spawner := NewUnitSpawner(ticker.eventDispatcher, ticker.space, ticker.teams, spawnSpeed)
			ticker.unitSpawners[spawnSpeed] = spawner
			spawner.Run()
		}
	}
}
