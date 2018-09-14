package main

import "fmt"

type baseBuilding struct {
	Owner    string
	Hp       int
	Colour   string
	Position [2]int
}

type unit struct {
	Owner   string
	Word    string
	Typed   string
	Remains string
}

// type playerUnits struct {
// 	Units map[string]*unit
// }

// Game strcut
type Game struct {
	Clients []*Client
	Bases   map[string]*baseBuilding
	Units   map[string]*map[string]*unit // { ClientID: { Word: Unit } ... }
}

// NewGame struct
func NewGame(clients []*Client) *Game {
	// bases := []*baseBuilding{}
	bases := make(map[string]*baseBuilding)
	units := make(map[string]*map[string]*unit)

	for i := 0; i < len(clients); i++ {
		client := clients[i]
		var position [2]int

		if i == 0 {
			position = [2]int{5, 50}
		} else {
			position = [2]int{95, 50}
		}

		base := &baseBuilding{Owner: client.ID, Hp: 50, Colour: "#000", Position: position}
		bases[client.ID] = base
		// bases = append(bases, base)

		pUnits := make(map[string]*unit)
		units[client.ID] = &pUnits
	}

	return &Game{Bases: bases, Units: units, Clients: clients}
}

func (g *Game) start() {
	g.spawnUnits()
	fmt.Println("Game started")
	fmt.Printf("Units are: %v\n", g.Units)
	for i := 0; i < len(g.Clients); i++ {
		client := g.Clients[i]
		cID := client.ID
		fmt.Printf("\tClient: %v has units: %v\n", cID, g.Units[cID])
	}
}

func (g *Game) spawnUnits() {
	for i := 0; i < len(g.Clients); i++ {
		client := g.Clients[i]
		cID := client.ID
		word := "helloworld"
		u := &unit{Owner: cID, Word: word, Typed: "", Remains: word}
		(*g.Units[cID])[word] = u
	}
}
