package typingwars

import (
	"log"

	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
)

type UnitManager struct {
	space           *Space
	eventDispatcher *EventDispatcher
}

func NewUnitManager(space *Space, eventDispatcher *EventDispatcher) *UnitManager {
	return &UnitManager{
		space:           space,
		eventDispatcher: eventDispatcher,
	}
}

func (um *UnitManager) updateUnits() {
	// log.Println("Updating units")
	for _, units := range um.space.Units {
		for _, unit := range *units {
			// log.Printf("Unit <%s> belonging to %s updated position: %v", unit.Word, unit.Owner, unit.Position)
			if unit.Position().Equal(unit.Target.Position()) {
				// TODO: Never arrives at target perfectly - not supposed to
				// Need to detect collision instead of position
				log.Println("Unit has arrived at target")
				continue
			} else if unit.CollidesWith(unit.Target) {
				// unit.Target.Hp--
				unitCollision := &UnitCollision{
					Unit: unit,
				}
				um.eventDispatcher.FireUnitCollision(unitCollision)
				// um.destroyUnit(unit.Owner(), unit)
				// log.Println("Collision!")
				continue
			} else {
				// TODO: Calculate vector to add to unit based off of unit's position and target's position
				// This will do for now as units are only going straight across horizontally
				velocity := types.NewVector(unit.Speed*unit.Position().GetXDirectionTo(unit.Target.Position()), 0)
				unit.SetPosition(unit.Position().Add(velocity))
			}
		}
	}
}

func (um *UnitManager) addUnit(unit *Unit) {
	userUnits := *um.space.Units[unit.Owner()]
	if _, ok := userUnits[unit.Word]; !ok {
		userUnits[unit.Word] = unit
		// log.Printf("Adding unit <%s> for client %s", unit.Word, unit.Owner)
		// log.Printf("All units now: %v", um.space.Units)
	} else {
		log.Printf("Unit with word already exists")
	}
}

func (um *UnitManager) DestroyUnit(unit *Unit) {
	um.destroyUnit(unit.Owner(), unit)
}

func (um *UnitManager) destroyUnit(owner uuid.UUID, unit *Unit) {
	delete(um.space.Targets, owner)
	delete(*um.space.Units[owner], unit.Word)
}

func (um *UnitManager) doDamage(unit *Unit, key string) {
	if string(unit.Word[unit.Typed]) != key {
		// log.Printf("No damage done bc unit: %v has no key: %s", unit, key)
		return
	}
	unit.Typed++
	if len(unit.Word) == int(unit.Typed) {
		// log.Printf("Destrying unit: %v", unit)
		um.destroyUnit(unit.Owner(), unit)
	}
}

func (um *UnitManager) Damage(owner uuid.UUID, key string) {
	units := *um.space.Units[owner]
	// log.Printf("User input key: %s", key)
	// If the owner has no units
	if len(units) == 0 {
		// log.Println("User has no units")
		return
	}

	// If the owner has already acquired a target
	if unit, ok := um.space.Targets[owner]; ok {
		// log.Printf("Doing damage to targeted unit: %v, key: %s", unit, key)
		um.doDamage(unit, key)
		return
	}

	// Acquire a target
	for word, unit := range units {
		if string(word[0]) == key {
			// log.Printf("Acquired new target to dmg: %v, key: %s", unit, key)
			um.space.Targets[owner] = unit
			um.doDamage(unit, key)
			return
		}
	}

	// log.Printf("No damage done bc no unit w/ key: %s", key)
}
