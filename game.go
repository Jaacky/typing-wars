package typingwars

import (
	"log"

	"github.com/gofrs/uuid"
)

// Game strcut
type Game struct {
	Clients         map[uuid.UUID]*Client
	Teams           []*Team
	Space           *Space
	InGame          bool
	EventDispatcher *EventDispatcher
	physicsTicker   *PhysicsTicker
	unitSpawner     *UnitSpawner

	eventDispatcherStop chan bool
	physicsTickerStop   chan bool
	unitSpawnerStop     chan bool
}

// NewGame struct
func NewGame(room *Room) *Game {
	// bases := []*baseBuilding{}
	clients := room.clients
	teams := makeTeams(clients, 2)
	space := NewSpace(clients)

	eventDispatcherStop := make(chan bool, 1)
	physicsTickerStop := make(chan bool, 1)
	unitSpawnerStop := make(chan bool, 1)

	eventDispatcher := NewEventDispatcher(eventDispatcherStop)
	physicsTicker := NewPhysicsTicker(physicsTickerStop, eventDispatcher)
	unitSpawner := NewUnitSpawner(unitSpawnerStop, eventDispatcher, space, teams)

	updater := NewUpdater(space, eventDispatcher)
	eventDispatcher.RegisterTimeTickListener(updater)
	eventDispatcher.RegisterUnitSpawnedListener(updater)
	eventDispatcher.RegisterUnitCollisionListener(updater)
	eventDispatcher.RegisterUserActionListener(updater)
	eventDispatcher.RegisterPhysicsReadyListener(room)
	eventDispatcher.RegisterGameOverListener(room)

	return &Game{
		Space:               space,
		Teams:               teams,
		Clients:             clients,
		EventDispatcher:     eventDispatcher,
		physicsTicker:       physicsTicker,
		unitSpawner:         unitSpawner,
		eventDispatcherStop: eventDispatcherStop,
		physicsTickerStop:   physicsTickerStop,
		unitSpawnerStop:     unitSpawnerStop,
	}
}

func makeTeams(clients map[uuid.UUID]*Client, numTeams int) []*Team {
	teams := []*Team{}

	for i := 0; i < numTeams; i++ {
		teams = append(teams, NewTeam())
		log.Printf("Team %d made!", i)
	}

	j := 0
	for _, client := range clients {
		teamNum := j % numTeams
		log.Printf("Client to team %d!", teamNum)
		teams[teamNum].AddPlayer(client)
		j++
	}

	return teams
}

func (g *Game) start() {
	go g.EventDispatcher.RunEventLoop()
	go g.physicsTicker.Run()
	go g.unitSpawner.Run()
}

func (g *Game) stop() {
	g.eventDispatcherStop <- true
	g.physicsTickerStop <- true
	g.unitSpawnerStop <- true
}
