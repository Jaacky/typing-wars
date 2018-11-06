package typingwars

import "github.com/gofrs/uuid"

// Game strcut
type Game struct {
	Clients         map[uuid.UUID]*Client
	Space           *Space
	InGame          bool
	EventDispatcher *EventDispatcher
	physicsTicker   *PhysicsTicker
	unitSpawner     *UnitSpawner
}

// NewGame struct
func NewGame(room *Room) *Game {
	// bases := []*baseBuilding{}
	clients := room.clients
	space := NewSpace(clients)

	eventDispatcher := NewEventDispatcher()
	physicsTicker := NewPhysicsTicker(eventDispatcher)
	unitSpawner := NewUnitSpawner(eventDispatcher)

	updater := NewUpdater(space, eventDispatcher)
	eventDispatcher.RegisterTimeTickListener(updater)
	eventDispatcher.RegisterUnitSpawnedListener(updater)

	eventDispatcher.RegisterPhysicsReadyListener(room)

	return &Game{
		Space:           space,
		Clients:         clients,
		EventDispatcher: eventDispatcher,
		physicsTicker:   physicsTicker,
		unitSpawner:     unitSpawner,
	}
}

func (g *Game) start() {
	go g.EventDispatcher.RunEventLoop()
	go g.physicsTicker.Run()
	go g.unitSpawner.Run(g.Space)
	for {

	}
}
