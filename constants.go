package main

const (
	createGameRoomMessageType          = "CREATE_GAME_ROOM"
	createGameRoomSuccessMessageType   = "CREATE_GAME_ROOM_SUCCESS"
	enterGameRoomMessageType           = "ENTER_GAME_ROOM"
	enterGameRoomSuccessMessageType    = "ENTER_GAME_ROOM_SUCCESS"
	newPlayerJoinedGameRoomMessageType = "NEW_PLAYER_JOINED"
	playerReadyMessageType             = "PLAYER_READY"
	otherPlayersReadyMessageType       = "OTHER_PLAYERS_READY"

	messageData         = "Data"
	messageDataNickname = "nickname"
	messageDataPlayerID = "playerID"
	messageDataRoomID   = "roomID"
	messageDataPlayers  = "players"
	messageReadyFlag    = "readyFlag"
)
