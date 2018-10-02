package types

// Vector struct
type Vector struct {
	X int32
	Y int32
}

// NewVector initialization
func NewVector(x, y int32) *Vector {
	return &Vector{
		X: x,
		Y: y,
	}
}
