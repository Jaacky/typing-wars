package events

import "github.com/Jaacky/typing-wars/state"

type UnitSpawned struct {
	Unit *state.Unit
}
