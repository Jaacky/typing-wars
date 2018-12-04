package wordgenerator

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"
)

const (
	WORD_FILE = "./wordgenerator/eff_large_wordlist.txt"
)

type WordGenerator struct {
	Words map[string]string
}

func NewWordGenerator() *WordGenerator {
	rand.Seed(time.Now().UnixNano())
	file, err := os.Open(WORD_FILE)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	words := make(map[string]string)
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.Fields(scanner.Text())
		words[line[0]] = line[1]
	}

	return &WordGenerator{
		Words: words,
	}
}

func (wg *WordGenerator) RollDice() int32 {
	return rand.Int31n(6) + 1
}

func (wg *WordGenerator) GetRandomWordId() string {
	return fmt.Sprintf("%d%d%d%d%d",
		wg.RollDice(),
		wg.RollDice(),
		wg.RollDice(),
		wg.RollDice(),
		wg.RollDice(),
	)
}

func (wg *WordGenerator) GetWord() string {
	id := wg.GetRandomWordId()
	return wg.Words[id]
}
