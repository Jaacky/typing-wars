package main

import (
	"github.com/Jaacky/typing-wars/events"
	"github.com/Jaacky/typing-wars/game"
)

type baseBuilding struct {
	Owner    string
	Hp       int
	Colour   string
	Position [2]int
}

type unit struct {
	Owner   string
	Word    string
	Typed   string
	Remains string
}

// Game strcut
type Game struct {
	Clients         []*Client
	Bases           map[string]*baseBuilding
	Units           map[string]*map[string]*unit // { ClientID: { Word: Unit } ... }
	InGame          bool
	EventDispatcher *events.EventDispatcher
	physicsTicker   *game.PhysicsTicker
	unitSpawner     *game.UnitSpawner
}

// NewGame struct
func NewGame(clients []*Client) *Game {
	// bases := []*baseBuilding{}
	bases := make(map[string]*baseBuilding)
	units := make(map[string]*map[string]*unit)

	for i := 0; i < len(clients); i++ {
		client := clients[i]
		var position [2]int

		if i == 0 {
			position = [2]int{5, 50}
		} else {
			position = [2]int{95, 50}
		}

		base := &baseBuilding{Owner: client.ID, Hp: 50, Colour: "#000", Position: position}
		bases[client.ID] = base

		pUnits := make(map[string]*unit)
		units[client.ID] = &pUnits
	}

	eventDispatcher := events.NewEventDispatcher()
	physicsTicker := game.NewPhysicsTicker(eventDispatcher)
	unitSpawner := game.NewUnitSpawner(eventDispatcher)

	updater := game.NewUpdater()
	eventDispatcher.RegisterTimeTickListener(updater)

	return &Game{
		Bases:           bases,
		Units:           units,
		Clients:         clients,
		EventDispatcher: eventDispatcher,
		physicsTicker:   physicsTicker,
		unitSpawner:     unitSpawner,
	}
}

func (g *Game) start() {
	go g.EventDispatcher.RunEventLoop()
	go g.physicsTicker.Run()
	go g.unitSpawner.Run()
}
