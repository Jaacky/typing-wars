package typingwars

// import "github.com/gofrs/uuid"

// type baseBuilding struct {
// 	Owner    uuid.UUID
// 	Hp       int
// 	Colour   string
// 	Position [2]int
// }

// type unit struct {
// 	Owner   uuid.UUID
// 	Word    string
// 	Typed   string
// 	Remains string
// }

// // Game strcut
// type Game struct {
// 	Clients         map[uuid.UUID]*Client
// 	Bases           map[uuid.UUID]*baseBuilding
// 	Units           map[uuid.UUID]*map[string]*unit // { ClientID: { Word: Unit } ... }
// 	InGame          bool
// 	EventDispatcher *EventDispatcher
// 	physicsTicker   *PhysicsTicker
// 	unitSpawner     *UnitSpawner
// }

// // NewGame struct
// func NewGame(clients map[uuid.UUID]*Client) *Game {
// 	// bases := []*baseBuilding{}
// 	bases := make(map[uuid.UUID]*baseBuilding)
// 	units := make(map[uuid.UUID]*map[string]*unit)

// 	i := 0
// 	for _, client := range clients {
// 		// client := clients[i]
// 		var position [2]int

// 		if i == 0 {
// 			position = [2]int{5, 50}
// 		} else {
// 			position = [2]int{95, 50}
// 		}

// 		base := &baseBuilding{Owner: client.ID, Hp: 50, Colour: "#000", Position: position}
// 		bases[client.ID] = base

// 		pUnits := make(map[string]*unit)
// 		units[client.ID] = &pUnits
// 		i++
// 	}

// 	gameMap := NewMap(clients)

// 	eventDispatcher := NewEventDispatcher()
// 	physicsTicker := NewPhysicsTicker(eventDispatcher)
// 	unitSpawner := NewUnitSpawner(eventDispatcher)

// 	updater := NewUpdater()
// 	eventDispatcher.RegisterTimeTickListener(updater)
// 	eventDispatcher.RegisterUnitSpawnedListener(updater)

// 	return &Game{
// 		Bases:           bases,
// 		Units:           units,
// 		Clients:         clients,
// 		EventDispatcher: eventDispatcher,
// 		physicsTicker:   physicsTicker,
// 		unitSpawner:     unitSpawner,
// 	}
// }

// func (g *Game) start() {
// 	go g.EventDispatcher.RunEventLoop()
// 	go g.physicsTicker.Run()
// 	go g.unitSpawner.Run()
// }
