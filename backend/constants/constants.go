package constants

import (
	"time"
)

const (
	PhysicsFrameDuration   = 200 * time.Millisecond
	UnitSpawningInterval   = 3 * time.Second
	BaseHp                 = 50
	UnitSpeed              = 2
	BaseSize               = 6
	UnitSize               = 2
	PlayerOneBaseXPosition = 0 + BaseSize/2
	PlayerOneBaseYPosition = 50
	PlayerTwoBaseXPosition = 100 - BaseSize/2
	PlayerTwoBaseYPosition = 50
)
