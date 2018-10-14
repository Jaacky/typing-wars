package typingwars

import (
	"html/template"
	"log"
	"net/http"

	"github.com/gofrs/uuid"
	"github.com/gorilla/websocket"
)

type roomCreateRequest struct {
	clientID uuid.UUID
	username string
}

type roomJoinRequest struct {
	clientID uuid.UUID
	username string
	roomID   uuid.UUID
}

type Server struct {
	rooms    map[uuid.UUID]*Room
	clients  map[uuid.UUID]*Client
	upgrader *websocket.Upgrader

	roomCreateCh chan *roomCreateRequest
	roomJoinCh   chan roomJoinRequest
}

func NewServer() *Server {
	return &Server{
		rooms:   make(map[uuid.UUID]*Room),
		clients: make(map[uuid.UUID]*Client),
		upgrader: &websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin:     func(r *http.Request) bool { return true },
		},
		roomCreateCh: make(chan *roomCreateRequest),
		roomJoinCh:   make(chan roomJoinRequest),
	}
}

func (server *Server) addRoom(room *Room) {
	server.rooms[room.ID] = room
}

func (server *Server) addClient(client *Client) {
	server.clients[client.ID] = client
}

func (server *Server) removeClient(client *Client) {
	delete(server.clients, client.ID)
}

func (server *Server) Listen() {
	connect := func(w http.ResponseWriter, r *http.Request) {
		log.Println("Client attempting connection")
		conn, err := server.upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}

		log.Println("Client connection established")
		client := NewClient(conn, server)
		server.addClient(client)
		client.Listen()
	}

	http.HandleFunc("/connect", connect)
	http.HandleFunc("/", home)

	go server.manageRooms()
	log.Println("End of serverlisten")
}

func (server *Server) manageRooms() {
	for {
		select {
		case request := <-server.roomCreateCh:
			log.Printf("Client %s creating room", request.clientID)
			client := server.clients[request.clientID]
			room := NewRoom()
			err := client.SetRoom(room)
			if err != nil {
				// TODO: Return room error to client
				log.Println(err)
			} else {
				server.addRoom(room)
				room.addClient(client, request.username)
			}
		case request := <-server.roomJoinCh:
			log.Printf("Client %s %s joining room %s", request.username, request.clientID, request.roomID)
			client := server.clients[request.clientID]
			room, ok := server.rooms[request.roomID]
			if ok {
				err := client.SetRoom(room)
				if err != nil {
					// TODO: Return room error to client
					log.Println(err)
				} else {
					room.addClient(client, "")
				}
			} else {
				// TODO: Room does not exist, return room error to client
			}

		}
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	homeTemplate.Execute(w, "ws://"+r.Host+"/connect")
}

var homeTemplate = template.Must(template.New("").Parse(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script>  
window.addEventListener("load", function(evt) {
    var output = document.getElementById("output");
    var input = document.getElementById("input");
    var ws;
    var print = function(message) {
        var d = document.createElement("div");
        d.innerHTML = message;
        output.appendChild(d);
    };
    document.getElementById("open").onclick = function(evt) {
        if (ws) {
            return false;
        }
        ws = new WebSocket("{{.}}");
        ws.onopen = function(evt) {
            print("OPEN");
        }
        ws.onclose = function(evt) {
            print("CLOSE");
            ws = null;
        }
        ws.onmessage = function(evt) {
            print("RESPONSE: " + evt.data);
        }
        ws.onerror = function(evt) {
            print("ERROR: " + evt.data);
        }
        return false;
    };
    document.getElementById("send").onclick = function(evt) {
        if (!ws) {
            return false;
        }
        print("SEND: " + input.value);
        ws.send(input.value);
        return false;
    };
    document.getElementById("close").onclick = function(evt) {
        if (!ws) {
            return false;
        }
        ws.close();
        return false;
    };
});
</script>
</head>
<body>
<table>
<tr><td valign="top" width="50%">
<p>Click "Open" to create a connection to the server, 
"Send" to send a message to the server and "Close" to close the connection. 
You can change the message and send multiple times.
<p>
<form>
<button id="open">Open</button>
<button id="close">Close</button>
<p><input id="input" type="text" value="Hello world!">
<button id="send">Send</button>
</form>
</td><td valign="top" width="50%">
<div id="output"></div>
</td></tr></table>
</body>
</html>
`))
