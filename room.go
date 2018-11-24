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
	InGame         bool
	game           *Game
}

const MAX_PLAYERS = 2

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
	// TODO: Add a remove client function which gets called whenever client leaves/disconnects
	if room.totalPlayers >= MAX_PLAYERS {
		// TODO: Return full room error to client
		return
	}

	room.totalPlayers += 1

	currentPlayer := NewPlayer(client.ID, username)
	room.clients[client.ID] = client
	room.players[client.ID] = currentPlayer
	room.playerStatuses[client.ID] = &playerStatus{
		ready: false,
		index: room.totalPlayers - 1, // 0 indexed
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

func (room *Room) removeClient(id uuid.UUID) bool {
	player := room.players[id]
	room.totalPlayers--
	delete(room.clients, id)
	delete(room.players, id)
	delete(room.playerStatuses, id)

	// Handling if in game after deleting client because need to send msg to clients left in room
	if room.InGame {
		room.endGame("message" + player.Username)
	}

	roomEmpty := room.totalPlayers == 0
	log.Printf("room empty? %t", roomEmpty)
	if !roomEmpty {
		// TODO: unready players left
		room.update()
	}
	return roomEmpty
}

func (room *Room) updatePlayerReady(clientID uuid.UUID, readyStatus bool) {
	log.Printf("Updating player ready status for client %s", clientID)
	if _, ok := room.playerStatuses[clientID]; ok {
		status := room.playerStatuses[clientID]
		status.ready = readyStatus
		log.Printf("Updated client: %s ready status to: %t", clientID, readyStatus)
		room.update()
	}
}

func (room *Room) start() {
	room.game = NewGame(room)

	startGameMessage := &pb.UserMessage{
		Content: &pb.UserMessage_StartGameAck{
			StartGameAck: &pb.StartGameAck{},
		},
	}

	room.SendToAllClients(startGameMessage)
	// room.game.EventDispatcher.RegisterPhysicsReadyListener(room)
	room.game.start()
	room.InGame = true
}

func (room *Room) endGame(msg string) {
	room.game.stop()
	room.InGame = false
	pbEndGame := &pb.EndGame{
		Message: msg,
	}

	endGameMessage := &pb.UserMessage{
		Content: &pb.UserMessage_EndGame{
			EndGame: pbEndGame,
		},
	}

	room.SendToAllClients(endGameMessage)
}

func (room *Room) update() {
	pbPlayers := make(map[string]*pb.Player)
	pbPlayerStatuses := make(map[string]*pb.PlayerStatus)
	startFlag := true
	for id, player := range room.players {
		idString := id.String()
		playerStatus := room.playerStatuses[id]
		startFlag = startFlag && playerStatus.ready

		pbPlayerStatus := &pb.PlayerStatus{
			Ready: playerStatus.ready,
			Index: playerStatus.index,
		}
		// log.Printf("client: %s - playerstatus: %v", idString, playerStatus)
		// log.Printf("Player: %s - pbPlayerStatus.Ready: %t, pbPlayerStatus.Index: %d, pbplayerstatus: %v", idString, pbPlayerStatus.Ready, pbPlayerStatus.Index, pbPlayerStatus)
		pbPlayers[idString] = player.ToProto()
		pbPlayerStatuses[idString] = pbPlayerStatus
	}

	startFlag = startFlag && room.totalPlayers == MAX_PLAYERS
	updateRoom := &pb.UpdateRoom{
		RoomId:         fmt.Sprintf("%s", room.ID),
		Players:        pbPlayers,
		PlayerStatuses: pbPlayerStatuses,
		StartFlag:      startFlag,
	}

	updateRoomMessage := &pb.UserMessage{
		Content: &pb.UserMessage_UpdateRoom{
			UpdateRoom: updateRoom,
		},
	}

	room.SendToAllClients(updateRoomMessage)
}

func (room *Room) HandlePhysicsReady(physicsReady *PhysicsReady) {
	room.SendToAllClients(room.game.Space.ToMessage())
}

func (room *Room) HandleGameOver(gameOver *GameOver) {
	// log.Printf("Sending game over messages, defeated is: player (%s) %s", room.players[gameOver.Defeated].Username, gameOver.Defeated.String())

	message := "Lost: " + gameOver.Defeated.String()
	room.endGame(message)
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
