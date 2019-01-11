package typingwars

import (
	"testing"

	"github.com/Jaacky/typingwars/backend/types"
	"github.com/gofrs/uuid/v3"
)

func TestNewObjectState(t *testing.T) {
	id, err := uuid.NewV4()
	if err != nil {
		t.Errorf("Error creating new UUID: %v", err)
	}
	size := uint32(6)
	position := types.NewPoint(0, 0)
	obj := NewObjectState(id, size, position)
	if obj.Owner() != id {
		t.Errorf("Owner doesn't match, want: %s, got: %s", id, obj.Owner())
	}
	if obj.Size() != size {
		t.Errorf("Size doesn't match, want: %d, got: %d", size, obj.Size())
	}
	if !obj.Position().Equal(position) {
		t.Errorf("Position doesn't match, want %v, got: %v", position, obj.Position())
	}
}

func TestCollidesWith(t *testing.T) {
	tables := []struct {
		x        *ObjectState
		y        *ObjectState
		collides bool
	}{
		{
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			true,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(0, 10)),
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			// false,
			true,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(10, 0)),
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			false,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(0, 6)),
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			// false,
			true,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(6, 0)),
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			false,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(0, 5)),
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			true,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(5, 0)),
			NewObjectState(newUUID(), 6, types.NewPoint(0, 0)),
			true,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(0, 5)),
			NewObjectState(newUUID(), 3, types.NewPoint(0, 0)),
			// false,
			true,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(5, 0)),
			NewObjectState(newUUID(), 3, types.NewPoint(0, 0)),
			false,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(0, 4)),
			NewObjectState(newUUID(), 3, types.NewPoint(0, 0)),
			true,
		},
		{
			NewObjectState(newUUID(), 6, types.NewPoint(4, 0)),
			NewObjectState(newUUID(), 3, types.NewPoint(0, 0)),
			true,
		},
	}
	for _, table := range tables {
		collision := table.x.CollidesWith(table.y)
		if collision != table.collides {
			t.Errorf("Object at (%f, %f) with size %d CollidesWith Object at (%f, %f) with size %d incorect, want %t, got: %t", table.x.Position().X, table.x.Position().Y, table.x.Size(), table.y.Position().X, table.y.Position().Y, table.y.Size(), table.collides, collision)
		}
	}
}

func newUUID() uuid.UUID {
	id, _ := uuid.NewV4()
	return id
}
