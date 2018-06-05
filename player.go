package main

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type Player struct {
	ID       string `json:"id"`
	Nickname string `json:"nickname"`
	client   *Client
}

func createPlayer(client *Client, nickname string) (*Player, error) {
	playerID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong creating player UUID: %s", err)
		return nil, err
	}

	return &Player{playerID.String(), nickname, client}, nil
}
