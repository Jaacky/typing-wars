package state

// Map struct
type Map struct {
	Bases map[string]*Base
	Units map[string]*Unit
}

// NewMap Initialization
func (m *Map) NewMap() *Map {
	return &Map{
		Bases: make(map[string]*Base),
		Units: make(map[string]*Unit),
	}
}
