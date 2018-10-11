package main

import (
	"log"
	"net/http"

	"github.com/Jaacky/typingwars"
)

func main() {
	server := typingwars.NewServer()

	server.Listen()
	log.Fatal(http.ListenAndServe(":8080", nil))
}
