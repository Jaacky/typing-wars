package main

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type gameRoom struct {
	id      string
	players []*player
}

func (g *gameRoom) addPlayer(p *player) {
	g.players = append(g.players, p)
}

func createGameRoom() (*gameRoom, error) {
	gameID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return nil, err
	}
	// fmt.Printf("UUIDv4: %s\n", gameID)
	return &gameRoom{gameID.String(), make([]*player, 0)}, nil
}
