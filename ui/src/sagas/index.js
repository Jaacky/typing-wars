import "regenerator-runtime/runtime"; // only for webpack dev server babel runtime https://github.com/redux-saga/redux-saga/issues/280
import { take, call, put, takeEvery, takeLatest, all, race } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { push } from 'react-router-redux';
import Protobuf from 'protobufjs';

import pb from '../pb/typingwars.pb';
import * as types from 'actions/types';
import * as actions from 'actions';

const websocketPath = "ws://localhost:8080/connect"; 
// const websocketPath = "ws://typing-wars.herokuapp.com/connect"; 

function watchIncomingMessages(socket) {
    return eventChannel(emit => {
        socket.onmessage = function(event) {
            receiveWebSocketMessage(emit, event);
        }

        socket.onclose = function(event) {
            console.log("ws connection closed");
            return emit(actions.socketClosed());
        };

        // Unsubscribe function - should close socket
        return () => {
            socket.close();
            console.log('Socket off');
        };
    });
}

function receiveWebSocketMessage(emit, event) {
    let fileReader = new FileReader();

    fileReader.onload = function() {
        // onload gets called after file reader done reading
        // stores read content in this.result
        handleProtobufMessage(emit, this.result);
    }

    fileReader.readAsArrayBuffer(event.data);
}

function handleProtobufMessage(emit, protobufMessage) {
    const msg = pb.typingwars.UserMessage.decode(new Uint8Array(protobufMessage));
    emit({ type: msg.content, data: msg[msg.content] });
}

function* propagateIncomingMessages(socketChannel) {
    while (true) {
        const action = yield take(socketChannel);
        yield put(action);
    }
}

function* sendOutgoingMessages(socket) {
    while (true) {
        const action = yield take(types.MESSAGE_TO_SERVER);
        socket.send(createServerMessage(action.data.type, action.data.data));
    }
}

const createServerMessage = (type, data) => {
    let encoded, msg;
    switch(type) {
        case types.PLAYER_READY:
            let updatePlayerReady = pb.typingwars.UpdatePlayerReady.create({
                "readyStatus": data.readyFlag
            })

            msg = pb.typingwars.UserMessage.create({
                "updatePlayerReady": updatePlayerReady
            });

            encoded = pb.typingwars.UserMessage.encode(msg)
            break;
        case types.START_GAME:
            msg = pb.typingwars.UserMessage.create({
                "startGameRequest": pb.typingwars.StartGameRequest.create({})
            })
            encoded = pb.typingwars.UserMessage.encode(msg)
            break;
        case types.USER_ACTION:
            let userInput = pb.typingwars.UserInput.create({
                "key": data.key
            });
            let userAction = pb.typingwars.UserAction.create({
                "userInput": userInput
            });

            msg = pb.typingwars.UserMessage.create({
                "userAction": userAction
            })
            encoded = pb.typingwars.UserMessage.encode(msg)
            break;
    }
    return encoded.finish();
}

function* createRoomHandler() {
    while (true) {
        const action = yield take(types.CREATE_GAME_ROOM);
        const socket = new WebSocket(websocketPath);

        socket.onopen = (event) => {
            let createRoomRequest = pb.typingwars.CreateRoomRequest.create({"username": action.username});

            let msg = pb.typingwars.UserMessage.create({"createRoomRequest": createRoomRequest});
            let encoded = pb.typingwars.UserMessage.encode(msg);
            socket.send(encoded.finish());
        }

        const socketChannel = yield call(watchIncomingMessages, socket);

        const { cancel } = yield race({
            task: all([
                call(propagateIncomingMessages, socketChannel),
                call(sendOutgoingMessages, socket)
            ]),
            cancel: take(types.SOCKET_CLOSED)
        });

        if (cancel) {
            socketChannel.close();
            yield put(push('/'));
        }
    }
}

function* joinRoomHandler() {
    while (true) {
        const action = yield take(types.ENTER_ROOM);
        const socket = new WebSocket(websocketPath);

        socket.onopen = (event) => {
            let joinRoomRequest = pb.typingwars.JoinRoomRequest.create({"roomId": action.roomId, "username": action.username});

            let msg = pb.typingwars.UserMessage.create({"joinRoomRequest": joinRoomRequest});
            let encoded = pb.typingwars.UserMessage.encode(msg);
            socket.send(encoded.finish());
            console.log("Sent join room request");
        }

        const socketChannel = yield call(watchIncomingMessages, socket);

        const { cancel } = yield race({
            task: all([
                call(propagateIncomingMessages, socketChannel),
                call(sendOutgoingMessages, socket)
            ]),
            cancel: take(types.SOCKET_CLOSED)
        });

        if (cancel) {
            console.log("Cancel is true");
            socketChannel.close();
            yield put(push('/'));
        }

    }
}

function* redirectToRoom(action) {
    // console.log("Redirecting to room", action);
    // yield put(actions.enteredRoom(action.data.roomID, action.data.playerID, action.data.players));
    yield put(actions.enteredRoom(action.data));
    yield put(push('/gameroom'));
}

function* watchJoinRoomAck() {
    yield takeEvery(types.JOIN_ROOM_ACK_MESSAGE, redirectToRoom)
}

function* updateRoom(action) {
    yield put(actions.updateRoom(action.data));
}

function* watchUpdateRoom() {
    yield takeEvery(types.UPDATE_ROOM_MESSAGE, updateRoom);
}

function* startGame(action) {
    yield put(actions.startGame(action.data));
}

function* watchStartGameAck() {
    yield takeEvery(types.START_GAME_ACK_MESSAGE, startGame);
}

function* updateSpace(action) {
    yield put(actions.updateSpace(action.data));
}

function* watchSpace() {
    yield takeEvery(types.SPACE_MESSAGE, updateSpace);
}

function* endGame(action) {
    yield put(actions.endGame(action.data));
}

function* watchEndGame() {
    yield takeEvery(types.END_GAME_MESSAGE, endGame)
}

function* handleClientError(action) {
    yield put(actions.handleClientError(action.data));
}

function* watchClientErrorMessages() {
    yield takeEvery(types.CLIENT_ERROR_MESSAGE, handleClientError)
}

export default function* rootSaga() {
    yield all([
        createRoomHandler(),
        joinRoomHandler(),
        watchJoinRoomAck(),
        watchUpdateRoom(),
        watchStartGameAck(),
        watchSpace(),
        watchEndGame(),
        watchClientErrorMessages(),
    ])
};
