package typingwars

import (
	"fmt"
	"log"
)

type Updater struct {
	baseManager     *BaseManager
	unitManager     *UnitManager
	eventDispatcher *EventDispatcher
}

func NewUpdater(space *Space, eventDispatcher *EventDispatcher) *Updater {
	return &Updater{
		baseManager:     NewBaseManager(space, eventDispatcher),
		unitManager:     NewUnitManager(space),
		eventDispatcher: eventDispatcher,
	}
}

func (updater *Updater) HandleTimeTick(timeTick *TimeTick) {
	fmt.Printf("Handling Time Tick, Time ticking, FrameID: %d\n", timeTick.FrameID)
	updater.updatePhysics()
}

func (updater *Updater) updatePhysics() {
	updater.unitManager.updateUnits()
	log.Println("Firing physics ready")
	updater.eventDispatcher.FirePhysicsReady(&PhysicsReady{})
}

// func (updater *Updater) HandlePhysicsReady(physicsReady *PhysicsReady) {

// }

func (updater *Updater) HandleUnitSpawned(unitSpawned *UnitSpawned) {
	fmt.Printf("Unit is spawned, unit word is: %s\n", unitSpawned.Unit.Word)
	updater.unitManager.addUnit(unitSpawned.Unit)
}
