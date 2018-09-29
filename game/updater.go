package game

import (
	"fmt"

	"github.com/Jaacky/typing-wars/events"
)

type Updater struct {
}

func NewUpdater() *Updater {
	return &Updater{}
}

func (updater *Updater) HandleTimeTick(timeTick *events.TimeTick) {
	fmt.Printf("Time ticking, FrameID: %d\n", timeTick.FrameID)
}
