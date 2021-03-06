package typingwars

import (
	"github.com/Jaacky/typingwars/backend/types"
	"github.com/gofrs/uuid/v3"
)

type Object interface {
	Owner() uuid.UUID
	Size() uint32
	Position() *types.Point

	SetPosition(*types.Point)
	CollidesWith(Object) bool
}
