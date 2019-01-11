package typingwars

import "github.com/gofrs/uuid/v3"

type GameOver struct {
	Defeated uuid.UUID
}
