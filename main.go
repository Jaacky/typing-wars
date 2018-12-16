package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = ":8080"
	} else {
		port = ":" + port
	}

	server := NewServer()
	server.Listen()
	log.Println("Listening on port - ", port)
	log.Fatal(http.ListenAndServe(port, nil))
	log.Println("After listen and serve")
}
