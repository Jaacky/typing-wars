package main

type Player struct {
	ID       string `json:"id"`
	Nickname string `json:"nickname"`
}

func createPlayer(ID string, nickname string) *Player {
	return &Player{ID, nickname}
}
