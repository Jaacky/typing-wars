package types

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
