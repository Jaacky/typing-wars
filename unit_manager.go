package typingwars

import (
	"log"

	"github.com/Jaacky/typingwars/types"
)

type UnitManager struct {
	space *Space
}

func NewUnitManager(space *Space) *UnitManager {
	return &UnitManager{
		space: space,
	}
}

func (um *UnitManager) updateUnits() {
	log.Println("Updating units")
	for _, units := range um.space.Units {
		for _, unit := range *units {
			log.Println("Unit update", unit.Position)
			velocity := types.NewVector(2, 0)
			unit.Position = unit.Position.Add(velocity)
		}
	}
}
