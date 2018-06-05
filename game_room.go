package main

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type gameRoom struct {
	id          string
	players     []*Player
	readyStatus map[string]bool
}

func (g *gameRoom) addPlayer(p *Player) {
	g.players = append(g.players, p)
	g.readyStatus[p.ID] = false
}

func (g *gameRoom) readyPlayer(p *Player, flag bool) {
	g.readyStatus[p.ID] = flag
}

func createGameRoom() (*gameRoom, error) {
	gameID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return nil, err
	}
	// fmt.Printf("UUIDv4: %s\n", gameID)
	return &gameRoom{gameID.String(), make([]*Player, 0), make(map[string]bool)}, nil
}
