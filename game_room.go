package main

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type gameRoom struct {
	id          string
	clients     []*Client
	readyStatus map[string]bool
}

func (g *gameRoom) addClient(c *Client) {
	g.clients = append(g.clients, c)
	g.readyStatus[c.ID] = false
}

func (g *gameRoom) readyClient(c *Client, flag bool) {
	g.readyStatus[c.ID] = flag
}

func (g *gameRoom) getPlayers() []*Player {
	players := make([]*Player, 0)
	for _, client := range g.clients {
		players = append(players, client.player)
	}

	return players
}

func createGameRoom() (*gameRoom, error) {
	gameID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return nil, err
	}
	// fmt.Printf("UUIDv4: %s\n", gameID)
	return &gameRoom{gameID.String(), make([]*Client, 0), make(map[string]bool)}, nil
}
