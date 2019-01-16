package types

import (
	"testing"
)

func TestNewPoint(t *testing.T) {
	x := float32(4)
	y := float32(5)
	point := NewPoint(x, y)

	if point.X != x {
		t.Errorf("NewPoint X value doesn't match, want: %f, got: %f", x, point.X)
	}

	if point.Y != y {
		t.Errorf("NewPoint Y value doesn't match, want: %f, got: %f", y, point.Y)
	}
}

func TestPointAdd(t *testing.T) {
	tables := []struct {
		point  *Point
		vector *Vector
		sum    *Point
	}{
		{
			NewPoint(0, 0),
			NewVector(0, 0),
			NewPoint(0, 0),
		},
		{
			NewPoint(0, 0),
			NewVector(1, 1),
			NewPoint(1, 1),
		},
		{
			NewPoint(1, 1),
			NewVector(1, 1),
			NewPoint(2, 2),
		},
		{
			NewPoint(0, 0),
			NewVector(1, 0),
			NewPoint(1, 0),
		},
		{
			NewPoint(0, 0),
			NewVector(0, 1),
			NewPoint(0, 1),
		},
		{
			NewPoint(1, 0),
			NewVector(0, 1),
			NewPoint(1, 1),
		},
	}
	for _, table := range tables {
		sum := table.point.Add(table.vector)
		// Need to deference pointer to compare
		if *sum != *table.sum {
			t.Errorf("Sum of point: (%f, %f) and vector: (%f, %f) is incorrect, want: (%f. %f), got: (%f, %f)", table.point.X, table.point.Y, table.vector.X, table.vector.Y, table.sum.X, table.sum.Y, sum.X, sum.Y)
		}
	}
}

func TestPointEquals(t *testing.T) {
	tables := []struct {
		point1 *Point
		point2 *Point
		equals bool
	}{
		{
			NewPoint(0, 0),
			NewPoint(0, 0),
			true,
		},
		{
			NewPoint(100, 0),
			NewPoint(100, 0),
			true,
		},
		{
			NewPoint(0, 0),
			NewPoint(1, 1),
			false,
		},
		{
			NewPoint(1, 1),
			NewPoint(2, 2),
			false,
		},
		{
			NewPoint(0, 0),
			NewPoint(1, 0),
			false,
		},
		{
			NewPoint(0, 0),
			NewPoint(0, 1),
			false,
		},
		{
			NewPoint(1, 0),
			NewPoint(1, 1),
			false,
		},
	}
	for _, table := range tables {
		equals := table.point1.Equal(table.point2)
		if equals != table.equals {
			t.Errorf("Equality of point1: (%f, %f) and point2: (%f, %f) is incorrect, want: %t, got: %t", table.point1.X, table.point1.Y, table.point2.X, table.point2.Y, table.equals, equals)
		}
	}
}

func TestGetXDirectionTo(t *testing.T) {
	tables := []struct {
		point1     *Point
		point2     *Point
		xDirection float32
	}{
		{
			NewPoint(0, 0),
			NewPoint(0, 0),
			float32(1),
		},
		{
			NewPoint(100, 0),
			NewPoint(100, 0),
			float32(1),
		},
		{
			NewPoint(0, 0),
			NewPoint(1, 1),
			float32(1),
		},
		{
			NewPoint(1, 1),
			NewPoint(2, 2),
			float32(1),
		},
		{
			NewPoint(0, 0),
			NewPoint(1, 0),
			float32(1),
		},
		{
			NewPoint(0, 0),
			NewPoint(0, 1),
			float32(1),
		},
		{
			NewPoint(1, 0),
			NewPoint(1, 1),
			float32(1),
		},
		{
			NewPoint(0, 1),
			NewPoint(1, 0),
			float32(1),
		},
		{
			NewPoint(100, 0),
			NewPoint(0, 0),
			float32(-1),
		},
		{
			NewPoint(2, 0),
			NewPoint(1, 1),
			float32(-1),
		},
		{
			NewPoint(2, 1),
			NewPoint(1, 2),
			float32(-1),
		},
		{
			NewPoint(1, 0),
			NewPoint(0, 0),
			float32(-1),
		},
		{
			NewPoint(1, 1),
			NewPoint(0, 1),
			float32(-1),
		},
	}
	for _, table := range tables {
		xDirection := table.point1.GetXDirectionTo(table.point2)
		if xDirection != table.xDirection {
			t.Errorf("X Direction from point: (%f, %f) to point: (%f, %f) is incorrect, want: %f, got: %f", table.point1.X, table.point1.Y, table.point2.X, table.point2.Y, table.xDirection, xDirection)
		}
	}
}
