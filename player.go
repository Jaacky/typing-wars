package main

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type player struct {
	id       uuid.UUID
	nickname string
}

func createPlayer(nickname string) (*player, error) {
	playerID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong creating player UUID: %s", err)
		return nil, err
	}

	return &player{playerID, nickname}, nil
}
