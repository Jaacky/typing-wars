package supervisor

import (
	"html/template"
	"log"
	"net/http"

	"github.com/Jaacky/typing-wars/communication"
	"github.com/gofrs/uuid"
	"github.com/gorilla/websocket"
)

type Server struct {
	rooms    map[uuid.UUID]*Room
	upgrader *websocket.Upgrader
}

func NewServer() *Server {
	return &Server{
		rooms: make(map[uuid.UUID]*Room),
		upgrader: &websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin:     func(r *http.Request) bool { return true },
		},
	}
}

func (server *Server) addRoom(room *Room) {
	server.rooms[room.ID] = room
}

func (server *Server) Listen() {
	createRoom := func(w http.ResponseWriter, r *http.Request) {
		log.Println("Client attempting to connect")
		conn, err := server.upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}

		log.Println("Client connected")

		room := NewRoom()
		server.addRoom(room)

		client := communication.NewClient(conn)
		room.addClient(client)

		client.Listen()
	}

	joinRoom := func(w http.ResponseWriter, r *http.Request) {
		log.Println("Client attempting to join a room")
		conn, err := server.upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}

		log.Println("Joining client connection established")

		roomID, err := uuid.FromString(r.FormValue("roomID"))
		if err != nil {
			log.Println(err)
			return
		}
		room, ok := server.rooms[roomID]
		if ok {
			client := communication.NewClient(conn)
			room.addClient(client)

			client.Listen()
		} else {
			log.Println("Room ID not found")
			// TODO: send room id not found message back to client browser
			return
		}
	}

	http.HandleFunc("/create", createRoom)
	http.HandleFunc("/join", joinRoom)
	http.HandleFunc("/", home)
}

func home(w http.ResponseWriter, r *http.Request) {
	homeTemplate.Execute(w, "ws://"+r.Host+"/create")
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
