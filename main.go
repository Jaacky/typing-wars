package main

import (
	"log"
	"net/http"
)

func main() {
	server := NewServer()
	server.Listen()
	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
	log.Println("After listen and serve")
}
