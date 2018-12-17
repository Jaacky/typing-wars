package typingwars

const (
	createGameRoomMessageType          = "CREATE_GAME_ROOM"
	createGameRoomSuccessMessageType   = "CREATE_GAME_ROOM_SUCCESS"
	enterGameRoomMessageType           = "ENTER_GAME_ROOM"
	enterGameRoomSuccessMessageType    = "ENTER_GAME_ROOM_SUCCESS"
	newPlayerJoinedGameRoomMessageType = "NEW_PLAYER_JOINED"
	playerReadyMessageType             = "PLAYER_READY"
	otherPlayersReadyMessageType       = "OTHER_PLAYERS_READY"
	startGameMessageType               = "START_GAME"
	gameBeginMessageType               = "GAME_BEGIN"
	gameEventType                      = "GAME_EVENT"
	keyPressType                       = "KEY_PRESS"

	messageData         = "Data"
	messageType         = "MessageType"
	messageDataType     = "type"
	messageDataKey      = "key"
	messageDataNickname = "nickname"
	messageDataPlayerID = "playerID"
	messageDataRoomID   = "roomID"
	messageDataPlayers  = "players"
	messageReadyFlag    = "readyFlag"
	messageReadyStatus  = "readyStatus"
	messageStartFlag    = "startFlag"
)
