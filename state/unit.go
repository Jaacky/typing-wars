package state

// Unit struct describes a word unit
type Unit struct {
	UnitSize uint32
	X        uint32
	Y        uint32
	Word     string
	Typed    uint32
}

func NewUnit(word string, x uint32, y uint32) *Unit {
	return &Unit{
		UnitSize: 3,
		X:        x,
		Y:        y,
		Word:     word,
		Typed:    0,
	}
}
