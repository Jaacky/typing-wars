package typingwars

import "log"

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

func (bm *BaseManager) Damage(base *Base) {
	base.Hp--
	log.Printf("Base hp: %d", base.Hp)
	if base.Hp <= 0 {
		gameOver := &GameOver{
			Defeated: base.Owner(),
		}
		log.Println("firing game over")
		bm.eventDispatcher.FireGameOver(gameOver)
	}
}
