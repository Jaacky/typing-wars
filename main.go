package main

import (
	"log"
	"net/http"
	"os"

	typingwars "github.com/Jaacky/typingwars/backend"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = ":80"
	} else {
		port = ":" + port
	}

	server := typingwars.NewServer()
	server.Listen()

	log.Println("Listening on port - ", port)
	log.Fatal(http.ListenAndServe(port, nil))
	log.Println("After listen and serve")
}
