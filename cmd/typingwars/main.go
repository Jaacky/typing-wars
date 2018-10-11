package main

import (
	"log"
	"net/http"

	"github.com/Jaacky/typing-wars/communication"
)

func main() {
	server := communication.NewServer()

	server.Listen()
	log.Fatal(http.ListenAndServe(":8080", nil))
}
