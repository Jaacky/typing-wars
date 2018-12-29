package typingwars

import (
	"log"
	"math/rand"
	"time"

	"github.com/Jaacky/typingwars/backend/constants"
	"github.com/Jaacky/typingwars/backend/types"
	"github.com/Jaacky/typingwars/backend/wordgenerator"
)

type UnitSpawner struct {
	eventDispatcher *EventDispatcher
	space           *Space
	teams           []*Team
	spawnSpeed      time.Duration
	stop            chan bool
}

func NewUnitSpawner(dispatcher *EventDispatcher, space *Space, teams []*Team, spawnSpeed time.Duration) *UnitSpawner {
	return &UnitSpawner{
		eventDispatcher: dispatcher,
		space:           space,
		teams:           teams,
		spawnSpeed:      spawnSpeed,
		stop:            make(chan bool, 1),
	}
}

func (spawner *UnitSpawner) Run() {
	wg := wordgenerator.NewWordGenerator()
	for range time.Tick(spawner.spawnSpeed) {
		select {
		case <-spawner.stop:
			log.Println("Spawner stopped")
			return
		default:
			// log.Println("Spawning unit")
			word := wg.GetWord()
			spawner.spawn(word)
		}
	}
}

func (spawner *UnitSpawner) spawn(word string) {
	for _, base := range spawner.space.Bases {
		for _, team := range spawner.teams {
			if _, ok := team.Players[base.Owner()]; !ok {
				for _, player := range team.Players {
					target := spawner.space.Bases[player.ID]

					xOffset := base.Position().GetXDirectionTo(target.Position()) * 3
					// yDrift := float32(rand.Int31n(40))
					yDrift := (rand.Float32()*2 - 1) * 40

					driftOffset := types.NewVector(xOffset, yDrift)
					startPosition := base.Position().Add(driftOffset)
					unit := NewUnit(base.Owner(), word, startPosition, constants.UnitSpeed, target)
					event := &UnitSpawned{
						Unit: unit,
					}
					// log.Println("New unit event complete, about to fire")
					spawner.eventDispatcher.FireUnitSpawned(event)
				}
			}
		}
	}
}
