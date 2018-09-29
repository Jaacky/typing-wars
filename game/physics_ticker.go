package game

import (
	"time"

	"github.com/Jaacky/typing-wars/constants"
	"github.com/Jaacky/typing-wars/events"
)

type PhysicsTicker struct {
	currentFrameID  uint32
	eventDispatcher *events.EventDispatcher
}

func NewPhysicsTicker(dispatcher *events.EventDispatcher) *PhysicsTicker {
	return &PhysicsTicker{
		currentFrameID:  1,
		eventDispatcher: dispatcher,
	}
}

func (ticker *PhysicsTicker) Run() {
	var i uint32
	i = 0
	for range time.Tick(constants.PhysicsFrameDuration) {
		event := &events.TimeTick{
			FrameID: i,
		}
		ticker.eventDispatcher.FireTimeTick(event)
		i++
	}
}
