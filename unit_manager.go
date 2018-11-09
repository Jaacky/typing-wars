package typingwars

import (
	"log"

	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
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
			log.Printf("Unit <%s> belonging to %s updated position: %v", unit.Word, unit.Owner, unit.Position)
			if unit.Position.Equal(unit.Target.Position) {
				continue
			} else {
				// TODO: Calculate vector to add to unit based off of unit's position and target's position
				// This will do for now as units are only going straight across horizontally
				velocity := types.NewVector(unit.Speed*unit.Position.GetXDirectionTo(unit.Target.Position), 0)
				unit.Position = unit.Position.Add(velocity)
			}
		}
	}
}

func (um *UnitManager) addUnit(unit *Unit) {
	userUnits := *um.space.Units[unit.Owner]
	if _, ok := userUnits[unit.Word]; !ok {
		userUnits[unit.Word] = unit
		log.Printf("Adding unit <%s> for client %s", unit.Word, unit.Owner)
		log.Printf("All units now: %v", um.space.Units)
	} else {
		log.Printf("Unit with word already exists")
	}
}

func (um *UnitManager) destroyUnit(owner uuid.UUID, unit *Unit) {
	delete(um.space.Targeted, owner)
	delete(*um.space.Units[owner], unit.Word)
}

func (um *UnitManager) doDamage(unit *Unit, key string) {
	if string(unit.Word[unit.Typed]) != key {
		return
	}
	unit.Typed++
	if len(unit.Word) == int(unit.Typed) {
		um.destroyUnit(unit.Owner, unit)
	}
}

func (um *UnitManager) Damage(owner uuid.UUID, key string) {
	units := *um.space.Units[owner]
	// If the owner has no units
	if len(units) == 0 {
		return
	}

	// If the owner has already acquired a target
	if unit, ok := um.space.Targeted[owner]; ok {
		um.doDamage(unit, key)
		return
	}

	// Acquire a target
	for word, unit := range units {
		if string(word[0]) == key {
			um.space.Targeted[owner] = unit
			um.doDamage(unit, key)
			return
		}
	}
}
