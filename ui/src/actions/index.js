import * as types from './types';

export const createRoom = (username) => {
    return {
        type: types.CREATE_GAME_ROOM,
        username,
    }
}

export const enterRoom = (username, roomId) => {
    return {
        type: types.ENTER_ROOM,
        username,
        roomId
    }
}

export const enteredRoom = (data) => {
    return {
        type: types.ENTERED_ROOM,
        loading: true,
        ...data
    }
}

export const updateRoom = (data) => {
    return {
        type: types.UPDATE_ROOM,
        loading: false,
        ...data
    }
}

// Called by saga
export const startGame = (data) => {
    return {
        type: types.START_GAME,
        ...data
    }
}

export const updateSpace = (data) => {
    return {
        type: types.SPACE_UPDATE,
        space: data
    }
}

export const endGame = (data) => {
    return {
        type: types.END_GAME,
        loading: true,
        ...data
    }
}

export const handleClientError = (data) => {
    return {
        type: types.CLIENT_ERROR,
        ...data,
    }
}

// Sent by client
export const playerReadyAction = (readyFlag) => {
    return messageToServerWrapper({
        type: types.PLAYER_READY,
        data: { readyFlag }
    })
}

export const startGameAction = () => {
    return messageToServerWrapper({
        type: types.START_GAME
    })
}

export const sendUserAction = (key) => {
    // console.log("sendUserAction - key: ", key);
    return messageToServerWrapper({
        type: types.USER_ACTION,
        data: key
    })
}

const messageToServerWrapper = (message) => {
    return {
        type: types.MESSAGE_TO_SERVER,
        data: message
    }
}

export const socketClosed = () => {
    return {
        type: types.SOCKET_CLOSED
    }
}
