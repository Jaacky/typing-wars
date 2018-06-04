package main

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type player struct {
	ID       string `json:"id"`
	Nickname string `json:"nickname"`
	client   *Client
}

func createPlayer(client *Client, nickname string) (*player, error) {
	playerID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong creating player UUID: %s", err)
		return nil, err
	}

	return &player{playerID.String(), nickname, client}, nil
}
