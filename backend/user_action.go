package typingwars

import "github.com/gofrs/uuid/v3"

type UserAction struct {
	Owner uuid.UUID
	Key   string
}
