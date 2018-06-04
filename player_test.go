package main

import (
	"testing"
)

func TestCreatePlayer(t *testing.T) {
	var p *player
	nickname := "Joe"
	p, _ = createPlayer(nil, nickname)

	if p.Nickname != nickname {
		t.Errorf("Expected %s, got %v\n", nickname, p.Nickname)
	}

}
