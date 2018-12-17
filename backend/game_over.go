package typingwars

import "github.com/gofrs/uuid"

type GameOver struct {
	Defeated uuid.UUID
}
