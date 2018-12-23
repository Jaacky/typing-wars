package main

import (
	"log"
	"net/http"
	"os"

	typingwars "github.com/Jaacky/typingwars/backend"
	packr "github.com/gobuffalo/packr/v2"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = ":8080"
	} else {
		port = ":" + port
	}

	server := typingwars.NewServer()
	server.Listen()

	box := packr.New("dist", "./ui/dist")
	http.Handle("/", http.FileServer(box))

	log.Println("Listening on port - ", port)
	log.Fatal(http.ListenAndServe(port, nil))
	log.Println("After listen and serve")
}
