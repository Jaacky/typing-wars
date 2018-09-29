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

type TimeTickEventListener interface {
	HandleTimeTick(*TimeTick)
}

type timeTickHandler struct {
	event          *TimeTick
	eventListeners []TimeTickEventListener
}

func (handler *timeTickHandler) handle() {
	for _, listener := range handler.eventListeners {
		listener.HandleTimeTick(handler.event)
	}
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

	timeTickListeners []TimeTickEventListener
}

// NewEventDispatcher comment
func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		running:           false,
		eventQueue:        make(chan eventHandler),
		timeTickListeners: []TimeTickEventListener{},
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

func (dispatcher *EventDispatcher) RegisterTimeTickListener(listener TimeTickEventListener) {
	dispatcher.timeTickListeners = append(dispatcher.timeTickListeners, listener)
}

// FireTimeTick function
func (dispatcher *EventDispatcher) FireTimeTick(timeTick *TimeTick) {
	handler := &timeTickHandler{
		event:          timeTick,
		eventListeners: dispatcher.timeTickListeners,
	}

	dispatcher.eventQueue <- handler
}
