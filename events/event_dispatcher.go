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

type TimeTickListener interface {
	HandleTimeTick(*TimeTick)
}

type timeTickHandler struct {
	event          *TimeTick
	eventListeners []TimeTickListener
}

func (handler *timeTickHandler) handle() {
	for _, listener := range handler.eventListeners {
		listener.HandleTimeTick(handler.event)
	}
}

type UnitSpawnedListener interface {
	HandleUnitSpawned(*UnitSpawned)
}

type unitSpawnedHandler struct {
	event          *UnitSpawned
	eventListeners []UnitSpawnedListener
}

func (handler *unitSpawnedHandler) handle() {
	for _, listener := range handler.eventListeners {
		listener.HandleUnitSpawned(handler.event)
	}
}

// EventDispatcher comment
type EventDispatcher struct {
	running bool

	eventQueue chan eventHandler

	timeTickListeners    []TimeTickListener
	unitSpawnedListeners []UnitSpawnedListener
}

// NewEventDispatcher comment
func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		running:              false,
		eventQueue:           make(chan eventHandler),
		timeTickListeners:    []TimeTickListener{},
		unitSpawnedListeners: []UnitSpawnedListener{},
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

func (dispatcher *EventDispatcher) RegisterTimeTickListener(listener TimeTickListener) {
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

func (dispatcher *EventDispatcher) RegisterUnitSpawnedListener(listener UnitSpawnedListener) {
	dispatcher.unitSpawnedListeners = append(dispatcher.unitSpawnedListeners, listener)
}

func (dispatcher *EventDispatcher) FireUnitSpawned(event *UnitSpawned) {
	handler := &unitSpawnedHandler{
		event:          event,
		eventListeners: dispatcher.unitSpawnedListeners,
	}

	dispatcher.eventQueue <- handler
}
