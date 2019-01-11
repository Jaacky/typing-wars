package typingwars

import (
	"log"
	"time"

	"github.com/Jaacky/typingwars/backend/constants"
	"github.com/Jaacky/typingwars/backend/wordgenerator"
)

type DifficultyTicker struct {
	eventDispatcher *EventDispatcher
	space           *Space
	teams           []*Team
	unitSpawners    map[time.Duration]*UnitSpawner
	wordGenerator   *wordgenerator.WordGenerator
	stop            chan bool
}

func NewDifficultyTicker(stop chan bool, dispatcher *EventDispatcher, space *Space, teams []*Team) *DifficultyTicker {
	return &DifficultyTicker{
		eventDispatcher: dispatcher,
		space:           space,
		teams:           teams,
		unitSpawners:    make(map[time.Duration]*UnitSpawner),
		wordGenerator:   wordgenerator.NewWordGenerator(),
		stop:            stop,
	}
}

func (ticker *DifficultyTicker) Run() {
	spawnSpeed := constants.UnitSpawningInterval * 2
	for range time.Tick(constants.DifficultyIncreaseInterval) {
		select {
		case <-ticker.stop:
			log.Println("Difficulty spawner stopped")
			for _, spawner := range ticker.unitSpawners {
				spawner.stop <- true
			}
			return
		default:
			log.Printf("Difficulty ticker - increasing spawn speed, interval: %v, spawnspeed: %v\n", constants.DifficultyIncreaseInterval, spawnSpeed)
			spawnSpeed = spawnSpeed / 2
			spawner := NewUnitSpawner(ticker.eventDispatcher, ticker.space, ticker.teams, ticker.wordGenerator, spawnSpeed)
			ticker.unitSpawners[spawnSpeed] = spawner
			go spawner.Run()
		}
	}
}
