package main

import (
	"log"
	"net/http"
	"os"

	typingwars "github.com/Jaacky/typingwars/backend"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	http.Handle("/metrics", promhttp.Handler())

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
