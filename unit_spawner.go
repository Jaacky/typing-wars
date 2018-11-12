package typingwars

import (
	"math/rand"
	"time"

	"github.com/Jaacky/typingwars/constants"
	"github.com/Jaacky/typingwars/types"
	"github.com/Jaacky/typingwars/wordgenerator"
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
	wg := wordgenerator.NewWordGenerator()
	for range time.Tick(constants.UnitSpawningInterval) {
		// log.Println("Spawning unit")
		word := wg.GetWord()
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
						unit := NewUnit(base.Owner(), word, startPosition, 0.5, target)
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
}
