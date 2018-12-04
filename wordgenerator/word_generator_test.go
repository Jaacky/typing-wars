package wordgenerator

import (
	"fmt"
	"math/rand"
	"testing"
)

const (
	SEED = 1337
)

func TestNewGenerator(t *testing.T) {
	wg := NewWordGenerator()
	want := 7776
	length := len(wg.Words)
	if length != want {
		t.Errorf("Number of words don't match the ones in file, want: %d, got: %d", want, length)
	}
}

func TestGetWord(t *testing.T) {
	wg := NewWordGenerator()
	rand.Seed(SEED)
	want := "sharpie"
	word := wg.GetWord()
	if word != want {
		t.Errorf("Word doesn't match, want: %s, got %s", want, word)
	}
}

func TestRollDice(t *testing.T) {
	wg := NewWordGenerator()
	rand.Seed(SEED)
	want := int32(5)
	roll := wg.RollDice()
	fmt.Printf("Roll: %d\n", roll)
	if roll != want {
		t.Errorf("Dice roll was not 5, want: %d, got: %d", want, roll)
	}
}
