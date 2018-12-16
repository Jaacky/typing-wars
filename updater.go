package main

type Updater struct {
	baseManager     *BaseManager
	unitManager     *UnitManager
	eventDispatcher *EventDispatcher
}

func NewUpdater(space *Space, eventDispatcher *EventDispatcher) *Updater {
	return &Updater{
		baseManager:     NewBaseManager(space, eventDispatcher),
		unitManager:     NewUnitManager(space, eventDispatcher),
		eventDispatcher: eventDispatcher,
	}
}

func (updater *Updater) HandleTimeTick(timeTick *TimeTick) {
	// fmt.Printf("Handling Time Tick, Time ticking, FrameID: %d\n", timeTick.FrameID)
	updater.updatePhysics()
}

func (updater *Updater) updatePhysics() {
	updater.unitManager.updateUnits()
	// log.Println("Firing physics ready")
	updater.eventDispatcher.FirePhysicsReady(&PhysicsReady{})
}

func (updater *Updater) HandleUnitSpawned(unitSpawned *UnitSpawned) {
	// fmt.Printf("Unit is spawned, unit word is: %s\n", unitSpawned.Unit.Word)
	updater.unitManager.addUnit(unitSpawned.Unit)
}

func (updater *Updater) HandleUserAction(userAction *UserAction) {
	// log.Println("User action handling")
	updater.unitManager.Damage(userAction.Owner, userAction.Key)
}

func (updater *Updater) HandleUnitCollision(unitCollision *UnitCollision) {
	unit := unitCollision.Unit
	updater.baseManager.Damage(unit.Target)
	updater.unitManager.DestroyUnit(unit)
}

// func (updater *Updater) HandleGameOver(gameOver *GameOver) {

// }
