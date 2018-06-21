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

func (g *gameRoom) getClients() []*Client {
	clients := make([]*Client, 0)
	for _, client := range g.clients {
		clients = append(clients, client)
	}

	return clients
}

func (g *gameRoom) getOtherClients(id string) []*Client {
	otherClients := make([]*Client, 0)
	for _, client := range g.clients {
		if client.ID != id {
			otherClients = append(otherClients, client)
		}
	}

	return otherClients
}

func (g *gameRoom) getStartFlag() bool {
	startFlag := true

	for key, status := range g.readyStatus {
		fmt.Printf("ready status iteration, key: %v, status: %v\n", key, status)
		startFlag = status && startFlag
	}

	return startFlag
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
