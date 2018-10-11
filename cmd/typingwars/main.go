package main

import (
	"log"
	"net/http"

	"github.com/Jaacky/typingwars"
)

func main() {
	server := typingwars.NewServer()

	server.Listen()
	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
	log.Println("After listen and serve")
}
