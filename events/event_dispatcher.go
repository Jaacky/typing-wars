package events

import (
	"fmt"
	"time"
)

const (
	idleDispatcherTime = 5 * time.Millisecond
)

type eventHandler interface {
	handle()
}

type UnitSpawnedEventListener interface {
	handleUnitSpawned(*UnitSpawned)
}

type UnitSpawnedHandler struct {
	event          *UnitSpawned
	eventListeners []UnitSpawnedEventListener
}

func (handler *UnitSpawnedHandler) handle() {
	for _, listener := range handler.eventListeners {
		listener.handleUnitSpawned(handler.event)
	}
}

// EventDispatcher comment
type EventDispatcher struct {
	running bool

	eventQueue chan eventHandler
}

// NewEventDispatcher comment
func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		running:    false,
		eventQueue: make(chan eventHandler),
	}
}

// RunEventLoop comment
func (dispatcher *EventDispatcher) RunEventLoop() {
	dispatcher.running = true
	for {
		select {
		case handler := <-dispatcher.eventQueue:
			fmt.Printf("Event queue popped: %v\n", handler)
			handler.handle()
		default:
			time.Sleep(idleDispatcherTime)
		}
	}
}
