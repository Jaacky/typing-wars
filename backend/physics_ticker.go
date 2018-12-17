package typingwars

import (
	"log"
	"time"

	"github.com/Jaacky/typingwars/backend/constants"
)

type PhysicsTicker struct {
	currentFrameID  uint32
	eventDispatcher *EventDispatcher
	stop            chan bool
}

func NewPhysicsTicker(stop chan bool, dispatcher *EventDispatcher) *PhysicsTicker {
	return &PhysicsTicker{
		currentFrameID:  1,
		eventDispatcher: dispatcher,
		stop:            stop,
	}
}

func (ticker *PhysicsTicker) Run() {
	var i uint32
	i = 0
	for range time.Tick(constants.PhysicsFrameDuration) {
		select {
		case <-ticker.stop:
			log.Println("physics ticker stop")
			return
		default:
			ticker.Tick(i)
			i++
		}
	}
}

func (ticker *PhysicsTicker) Tick(frameId uint32) {
	event := &TimeTick{
		FrameID: frameId,
	}
	ticker.eventDispatcher.FireTimeTick(event)
}
