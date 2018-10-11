package typingwars

import (
	"fmt"
)

type Updater struct {
}

func NewUpdater() *Updater {
	return &Updater{}
}

func (updater *Updater) HandleTimeTick(timeTick *TimeTick) {
	fmt.Printf("Time ticking, FrameID: %d\n", timeTick.FrameID)
}

func (updater *Updater) HandleUnitSpawned(unitSpawned *UnitSpawned) {
	fmt.Printf("Unit is spawned, unit word is: %s\n", unitSpawned.Unit.Word)
}
