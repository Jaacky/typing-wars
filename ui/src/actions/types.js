// Protobuf messages
export const SPACE_MESSAGE = "space";
export const JOIN_ROOM_ACK_MESSAGE = "joinRoomAck";
export const UPDATE_ROOM_MESSAGE = "updateRoom";
export const START_GAME_ACK_MESSAGE = "startGameAck";
export const END_GAME_MESSAGE = 'endGame';
export const CLIENT_ERROR_MESSAGE = 'clientError';

// Protobuf transformed into action type for reducer
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const SPACE_UPDATE = "SPACE_UPDATE";
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const USER_ACTION = 'USER_ACTION';
export const CLIENT_ERROR = 'CLIENT_ERROR';

// Client action to handle
export const ENTER_ROOM = 'ENTER_ROOM';
export const CREATE_GAME_ROOM = 'CREATE_GAME_ROOM';

export const SOCKET_CLOSED = 'SOCKET_CLOSED';
export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';
export const ENTERED_ROOM = 'ENTERED_ROOM';
export const PLAYER_READY = 'PLAYER_READY';

export const MESSAGE_TO_SERVER = 'MESSAGE_TO_SERVER';