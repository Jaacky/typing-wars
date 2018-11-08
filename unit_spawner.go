package typingwars

import (
	"log"
	"time"

	"github.com/Jaacky/typingwars/constants"
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
	word := "a"
	for range time.Tick(constants.UnitSpawningInterval) {
		log.Println("Spawning unit")
		for _, base := range spawner.space.Bases {
			for _, team := range spawner.teams {
				if _, ok := team.Players[base.Owner]; !ok {
					for _, player := range team.Players {
						target := spawner.space.Bases[player.ID]
						log.Println("New unit")
						unit := NewUnit(base.Owner, word, base.Position, 1, target)
						word += "a"
						event := &UnitSpawned{
							Unit: unit,
						}
						log.Println("New unit event complete, about to fire")
						spawner.eventDispatcher.FireUnitSpawned(event)
					}
				}
			}
		}
	}
}
