package typingwars

import (
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
	// log.Println("Time ticker handler handling")
	for _, listener := range handler.eventListeners {
		listener.HandleTimeTick(handler.event)
	}
	// log.Println("Time ticker handler handling finished")
}

type PhysicsReadyListener interface {
	HandlePhysicsReady(*PhysicsReady)
}

type physicsReadyHandler struct {
	event          *PhysicsReady
	eventListeners []PhysicsReadyListener
}

func (handler *physicsReadyHandler) handle() {
	// log.Println("PhysicsReadyHandler handling", handler.eventListeners)
	for _, listener := range handler.eventListeners {
		listener.HandlePhysicsReady(handler.event)
	}
	// log.Println("Physicsreadyhandler finished handling")
}

type UnitSpawnedListener interface {
	HandleUnitSpawned(*UnitSpawned)
}

type unitSpawnedHandler struct {
	event          *UnitSpawned
	eventListeners []UnitSpawnedListener
}

func (handler *unitSpawnedHandler) handle() {
	// log.Println("Unit spawner handler handling")
	for _, listener := range handler.eventListeners {
		listener.HandleUnitSpawned(handler.event)
	}
	// log.Println("Unit spawner handler finished handling")
}

type UnitCollisionListener interface {
	HandleUnitCollision(*UnitCollision)
}

type unitCollisionHandler struct {
	event          *UnitCollision
	eventListeners []UnitCollisionListener
}

func (handler *unitCollisionHandler) handle() {
	for _, listener := range handler.eventListeners {
		listener.HandleUnitCollision(handler.event)
	}
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

type GameOverListener interface {
	HandleGameOver(*GameOver)
}

type gameOverHandler struct {
	event          *GameOver
	eventListeners []GameOverListener
}

func (handler *gameOverHandler) handle() {
	for _, listener := range handler.eventListeners {
		listener.HandleGameOver(handler.event)
	}
}

// EventDispatcher comment
type EventDispatcher struct {
	running bool
	stop    chan bool

	priorityQueue chan eventHandler
	eventQueue    chan eventHandler

	timeTickListeners      []TimeTickListener
	unitSpawnedListeners   []UnitSpawnedListener
	unitCollisionListeners []UnitCollisionListener
	physicsReadyListeners  []PhysicsReadyListener
	userActionListeners    []UserActionListener
	gameOverListeners      []GameOverListener
}

// NewEventDispatcher comment
func NewEventDispatcher(stop chan bool) *EventDispatcher {
	return &EventDispatcher{
		stop:                   stop,
		running:                false,
		priorityQueue:          make(chan eventHandler, eventQueuesCapacity),
		eventQueue:             make(chan eventHandler, eventQueuesCapacity),
		timeTickListeners:      []TimeTickListener{},
		unitSpawnedListeners:   []UnitSpawnedListener{},
		unitCollisionListeners: []UnitCollisionListener{},
		physicsReadyListeners:  []PhysicsReadyListener{},
		userActionListeners:    []UserActionListener{},
		gameOverListeners:      []GameOverListener{},
	}
}

// RunEventLoop comment
func (dispatcher *EventDispatcher) RunEventLoop() {
	dispatcher.running = true
	for {
		select {
		case <-dispatcher.stop:
			dispatcher.running = false
			return
		case handler := <-dispatcher.priorityQueue:
			handler.handle()
		case handler := <-dispatcher.eventQueue:
			// fmt.Printf("Event queue popped: %v\n", handler)
			handler.handle()
			// log.Println("Finishing handling")
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
	// log.Println("Time tick fired")
}

func (dispatcher *EventDispatcher) RegisterUnitSpawnedListener(listener UnitSpawnedListener) {
	dispatcher.unitSpawnedListeners = append(dispatcher.unitSpawnedListeners, listener)
}

func (dispatcher *EventDispatcher) FireUnitSpawned(event *UnitSpawned) {
	handler := &unitSpawnedHandler{
		event:          event,
		eventListeners: dispatcher.unitSpawnedListeners,
	}
	// log.Println("About to add unit spawned handler to event queue")
	dispatcher.eventQueue <- handler
	// log.Println("Unit spawned fired")
}

func (dispatcher *EventDispatcher) RegisterUnitCollisionListener(listener UnitCollisionListener) {
	dispatcher.unitCollisionListeners = append(dispatcher.unitCollisionListeners, listener)
}

func (dispatcher *EventDispatcher) FireUnitCollision(unitCollision *UnitCollision) {
	handler := &unitCollisionHandler{
		event:          unitCollision,
		eventListeners: dispatcher.unitCollisionListeners,
	}

	dispatcher.eventQueue <- handler
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
	// log.Println("Physics ready fired")
}

func (dispatcher *EventDispatcher) RegisterUserActionListener(listener UserActionListener) {
	dispatcher.userActionListeners = append(dispatcher.userActionListeners, listener)
}

func (dispatcher *EventDispatcher) FireUserAction(userAction *UserAction) {
	// log.Println("Firing user action")
	handler := &userActionHandler{
		event:          userAction,
		eventListeners: dispatcher.userActionListeners,
	}

	dispatcher.eventQueue <- handler
}

func (dispatcher *EventDispatcher) RegisterGameOverListener(listener GameOverListener) {
	dispatcher.gameOverListeners = append(dispatcher.gameOverListeners, listener)
}

func (dispatcher *EventDispatcher) FireGameOver(gameOver *GameOver) {
	handler := &gameOverHandler{
		event:          gameOver,
		eventListeners: dispatcher.gameOverListeners,
	}

	dispatcher.priorityQueue <- handler
}
