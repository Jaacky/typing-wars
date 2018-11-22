package typingwars

import (
	"log"
	"time"

	"github.com/Jaacky/typingwars/constants"
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
			event := &TimeTick{
				FrameID: i,
			}
			ticker.eventDispatcher.FireTimeTick(event)
			i++
		}
	}
}
