package main

import "github.com/gofrs/uuid"

type UserAction struct {
	Owner uuid.UUID
	Key   string
}
