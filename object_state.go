package typingwars

import (
	"math"

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

// Assumes that objects are square with the position as it's center
func (objectState *ObjectState) CollidesWith(other Object) bool {
	// v := types.NewVector(objectState.Position().X-other.Position().X,
	// 	objectState.Position().Y)
	// distance := v.Length()
	// fmt.Printf("Distance: %f\n", distance)
	// return distance < float32(objectState.Size())/2+float32(other.Size())/2
	// if math.Abs(float64(objectState.Position().X-other.Position().X)) < float64(objectState.Size())/2+float64(other.Size())/2 {
	// 	fmt.Printf("space between positions = collides: %f\n", float64(objectState.Size())/2+float64(other.Size())/2)
	// 	fmt.Printf("x distance between: %f\n", math.Abs(float64(objectState.Position().X-other.Position().X)))
	// 	fmt.Printf("objectState position: %v, other position: %v\n", objectState.Position(), other.Position())
	// }

	return math.Abs(float64(objectState.Position().X-other.Position().X)) < float64(objectState.Size())/2+float64(other.Size())/2
}
