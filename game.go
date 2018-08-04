package main

type baseBuilding struct {
	Owner    string
	Hp       int
	Colour   string
	Position [2]int
}

// Game strcut
type Game struct {
	Bases []*baseBuilding
}

func newGame(clients []*Client) *Game {
	bases := []*baseBuilding{}

	for i := 0; i < len(clients); i++ {
		client := clients[i]
		var position [2]int

		if i == 0 {
			position = [2]int{5, 0}
		} else {
			position = [2]int{5, 10}
		}

		base := &baseBuilding{Owner: client.ID, Hp: 50, Colour: "#000", Position: position}
	}

	return &Game{bases}
}
