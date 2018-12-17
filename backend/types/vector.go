package types

import (
	"math"
)

// Vector struct
type Vector struct {
	X float32
	Y float32
}

// NewVector initialization
func NewVector(x, y float32) *Vector {
	return &Vector{
		X: x,
		Y: y,
	}
}

func (vector *Vector) Length() float32 {
	return float32(math.Sqrt(float64(vector.X*vector.X + vector.Y*vector.Y)))
}
