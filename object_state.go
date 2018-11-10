package typingwars

import (
	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
)

type ObjectState struct {
	owner    uuid.UUID
	size     uint32
	position *types.Point
}

func NewObjectState(owner uuid.UUID, size uint32, position *types.Point) *ObjectState {
	return &ObjectState{
		owner:    owner,
		size:     size,
		position: position,
	}
}

func (objectState *ObjectState) Owner() uuid.UUID {
	return objectState.owner
}

func (objectState *ObjectState) Size() uint32 {
	return objectState.size
}

func (objectState *ObjectState) Position() *types.Point {
	return objectState.position
}

func (objectState *ObjectState) SetPosition(position *types.Point) {
	objectState.position = position
}
