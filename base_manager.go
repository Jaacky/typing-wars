package typingwars

type BaseManager struct {
	space           *Space
	eventDispatcher *EventDispatcher
}

func NewBaseManager(space *Space, eventDispatcher *EventDispatcher) *BaseManager {
	return &BaseManager{
		space:           space,
		eventDispatcher: eventDispatcher,
	}
}
