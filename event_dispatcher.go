package typingwars

import (
	"fmt"
	"log"
	"time"
)

const (
	eventQueuesCapacity = 100000
	idleDispatcherTime  = 5 * time.Millisecond
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
	log.Println("Time ticker handler handling")
	for _, listener := range handler.eventListeners {
		listener.HandleTimeTick(handler.event)
	}
	log.Println("Time ticker handler handling finished")
}

type PhysicsReadyListener interface {
	HandlePhysicsReady(*PhysicsReady)
}

type physicsReadyHandler struct {
	event          *PhysicsReady
	eventListeners []PhysicsReadyListener
}

func (handler *physicsReadyHandler) handle() {
	log.Println("PhysicsReadyHandler handling", handler.eventListeners)
	for _, listener := range handler.eventListeners {
		listener.HandlePhysicsReady(handler.event)
	}
	log.Println("Physicsreadyhandler finished handling")
}

type UnitSpawnedListener interface {
	HandleUnitSpawned(*UnitSpawned)
}

type unitSpawnedHandler struct {
	event          *UnitSpawned
	eventListeners []UnitSpawnedListener
}

func (handler *unitSpawnedHandler) handle() {
	log.Println("Unit spawner handler handling")
	for _, listener := range handler.eventListeners {
		listener.HandleUnitSpawned(handler.event)
	}
	log.Println("Unit spawner handler finished handling")
}

type UserActionListener interface {
	HandleUserAction(*UserAction)
}

type userActionHandler struct {
	event          *UserAction
	eventListeners []UserActionListener
}

func (handler *userActionHandler) handle() {
	for _, listener := range handler.eventListeners {
		listener.HandleUserAction(handler.event)
	}
}

// EventDispatcher comment
type EventDispatcher struct {
	running bool

	eventQueue chan eventHandler

	timeTickListeners     []TimeTickListener
	unitSpawnedListeners  []UnitSpawnedListener
	physicsReadyListeners []PhysicsReadyListener
	userActionListeners   []UserActionListener
}

// NewEventDispatcher comment
func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		running:               false,
		eventQueue:            make(chan eventHandler, eventQueuesCapacity),
		timeTickListeners:     []TimeTickListener{},
		unitSpawnedListeners:  []UnitSpawnedListener{},
		physicsReadyListeners: []PhysicsReadyListener{},
		userActionListeners:   []UserActionListener{},
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
			log.Println("Finishing handling")
		default:
			// log.Println("Sleeping idle dispatcher")
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
	log.Println("Time tick fired")
}

func (dispatcher *EventDispatcher) RegisterUnitSpawnedListener(listener UnitSpawnedListener) {
	dispatcher.unitSpawnedListeners = append(dispatcher.unitSpawnedListeners, listener)
}

func (dispatcher *EventDispatcher) FireUnitSpawned(event *UnitSpawned) {
	handler := &unitSpawnedHandler{
		event:          event,
		eventListeners: dispatcher.unitSpawnedListeners,
	}
	log.Println("About to add unit spawned handler to event queue")
	dispatcher.eventQueue <- handler
	log.Println("Unit spawned fired")
}

func (dispatcher *EventDispatcher) RegisterPhysicsReadyListener(listener PhysicsReadyListener) {
	dispatcher.physicsReadyListeners = append(dispatcher.physicsReadyListeners, listener)
}

func (dispatcher *EventDispatcher) FirePhysicsReady(physicsReady *PhysicsReady) {
	handler := &physicsReadyHandler{
		event:          physicsReady,
		eventListeners: dispatcher.physicsReadyListeners,
	}

	dispatcher.eventQueue <- handler
	log.Println("Physics ready fired")
}

func (dispatcher *EventDispatcher) RegisterUserActionListener(listener UserActionListener) {
	dispatcher.userActionListeners = append(dispatcher.userActionListeners, listener)
}

func (dispatcher *EventDispatcher) FireUserAction(userAction *UserAction) {
	handler := &userActionHandler{
		event:          userAction,
		eventListeners: dispatcher.userActionListeners,
	}

	dispatcher.eventQueue <- handler
}
