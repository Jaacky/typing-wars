package typingwars

import "github.com/gofrs/uuid/v3"

type Team struct {
	Players map[uuid.UUID]*Client
}

func NewTeam() *Team {
	return &Team{
		Players: make(map[uuid.UUID]*Client),
	}
}

func (team *Team) AddPlayer(client *Client) {
	team.Players[client.ID] = client
}
