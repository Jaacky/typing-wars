package main

import (
	"encoding/json"
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type gameRoom struct {
	id          string
	clients     []*Client
	readyStatus map[string]bool
	game        *Game
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

func (g *gameRoom) startGame() {
	if g.getStartFlag() {
		fmt.Println("Starting game")
		game := NewGame(g.clients)
		g.game = game

		// Wrap game with constant key:value
		response := message{MessageType: gameBeginMessageType, Data: game}
		json, err := json.Marshal(response)
		if err != nil {
			fmt.Printf("Something went wrong marshalling response to json in start game, %s", err)
		}

		for _, client := range g.clients {
			client.send <- json
		}

		g.game.start()
	}
}

func createGameRoom() (*gameRoom, error) {
	gameID, err := uuid.NewV4()
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return nil, err
	}

	return &gameRoom{id: gameID.String(), clients: make([]*Client, 0), readyStatus: make(map[string]bool)}, nil
}
