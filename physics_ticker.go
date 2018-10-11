package typingwars

import (
	"time"

	"github.com/Jaacky/typingwars/constants"
)

type PhysicsTicker struct {
	currentFrameID  uint32
	eventDispatcher *EventDispatcher
}

func NewPhysicsTicker(dispatcher *EventDispatcher) *PhysicsTicker {
	return &PhysicsTicker{
		currentFrameID:  1,
		eventDispatcher: dispatcher,
	}
}

func (ticker *PhysicsTicker) Run() {
	var i uint32
	i = 0
	for range time.Tick(constants.PhysicsFrameDuration) {
		event := &TimeTick{
			FrameID: i,
		}
		ticker.eventDispatcher.FireTimeTick(event)
		i++
	}
}
