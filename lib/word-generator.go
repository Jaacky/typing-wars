package lib

import (
	"fmt"
	"math/rand"
	"time"
)

func RandomWord(firstChar []string) string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	char := firstChar[r.Intn(len(firstChar))]
	fmt.Println(char)
	return char
}
