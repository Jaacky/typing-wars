package typingwars

import (
	"fmt"
	"log"

	"github.com/Jaacky/typingwars/pb"
	"github.com/gofrs/uuid"
	"github.com/golang/protobuf/proto"
)

type playerStatus struct {
	ready bool
	index int32
}

type Room struct {
	ID             uuid.UUID
	clients        map[uuid.UUID]*Client
	players        map[uuid.UUID]*Player
	playerStatuses map[uuid.UUID]*playerStatus
	totalPlayers   int32
}

func NewRoom() *Room {
	id, err := uuid.NewV4()
	if err != nil {
		log.Fatalf("Failed to generate uuid: %v", err)
	}

	return &Room{
		ID:             id,
		clients:        make(map[uuid.UUID]*Client),
		players:        make(map[uuid.UUID]*Player),
		playerStatuses: make(map[uuid.UUID]*playerStatus),
		totalPlayers:   0,
	}
}

func (room *Room) addClient(client *Client, username string) {
	room.totalPlayers += 1

	currentPlayer := NewPlayer(client.ID, username)
	room.clients[client.ID] = client
	room.players[client.ID] = currentPlayer
	room.playerStatuses[client.ID] = &playerStatus{
		ready: false,
		index: room.totalPlayers,
	}

	joinRoomAck := &pb.JoinRoomAck{
		ClientId: fmt.Sprintf("%s", client.ID),
	}

	joinRoomAckMessage := &pb.UserMessage{
		Content: &pb.UserMessage_JoinRoomAck{
			JoinRoomAck: joinRoomAck,
		},
	}

	room.SendToClient(client.ID, joinRoomAckMessage)
	room.update()
}

func (room *Room) updatePlayerReady(clientID uuid.UUID, readyStatus bool) {
	log.Println("Updating player ready status for client %s", clientID)
	if _, ok := room.playerStatuses[clientID]; ok {
		status := room.playerStatuses[clientID]
		status.ready = readyStatus
		log.Printf("Updated client: %s ready status to: %t", clientID, readyStatus)
		room.update()
	}
}

func (room *Room) update() {
	pbPlayers := make(map[string]*pb.Player)
	pbPlayerStatuses := make(map[string]*pb.PlayerStatus)
	for id, player := range room.players {
		idString := id.String()
		playerStatus := room.playerStatuses[id]

		pbPlayer := &pb.Player{
			Id:       idString,
			Username: player.Username,
		}
		pbPlayerStatus := &pb.PlayerStatus{
			Ready: playerStatus.ready,
			Index: playerStatus.index,
		}
		log.Printf("client: %s - playerstatus: %v", idString, playerStatus)
		log.Printf("Player: %s - pbPlayerStatus.Ready: %t, pbPlayerStatus.Index: %d, pbplayerstatus: %v", idString, pbPlayerStatus.Ready, pbPlayerStatus.Index, pbPlayerStatus)
		pbPlayers[idString] = pbPlayer
		pbPlayerStatuses[idString] = pbPlayerStatus
	}

	updateRoom := &pb.UpdateRoom{
		RoomId:         fmt.Sprintf("%s", room.ID),
		Players:        pbPlayers,
		PlayerStatuses: pbPlayerStatuses,
	}

	updateRoomMessage := &pb.UserMessage{
		Content: &pb.UserMessage_UpdateRoom{
			UpdateRoom: updateRoom,
		},
	}

	room.SendToAllClients(updateRoomMessage)
}

func (room *Room) SendToClient(clientID uuid.UUID, message proto.Message) {
	client, ok := room.clients[clientID]
	if ok {
		client.SendMessage(message)
	} else {
		log.Printf("Client %d not found\n", clientID)
		return
	}
}

func (room *Room) SendToAllClients(message proto.Message) {
	for _, client := range room.clients {
		client.SendMessage(message)
	}
}
