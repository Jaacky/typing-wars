import { combineReducers } from 'redux';
import { routerReducer, push } from 'react-router-redux';

import * as types from 'actions/types';

/*
    {
        game: {
            gameId,
            nickname:
            players:
        }
    }
*/

const game = (state = {}, action) => {
    let loading;
    let roomId, clientId, players, startFlag, gameStatus;
    let playerStatuses, space;

    switch (action.type) {
        case types.SPACE_UPDATE:
            // console.log("Space reducer received", action);
            space = action.space;
            return {...state, space }
        case types.ENTERED_ROOM:
            clientId = action.clientId;
            loading = action.loading;
            return { ...state, clientId, loading };
        case types.UPDATE_ROOM:
            // console.log("Update room", action);
            loading = action.loading;
            roomId = action.roomId;
            players = action.players;
            playerStatuses = action.playerStatuses
            startFlag = action.startFlag
            return { ...state, loading, roomId, players, playerStatuses, startFlag };
        case types.START_GAME:
            gameStatus = true;
            return { ...state, gameStatus }
        case types.END_GAME:
            console.log("types.END_GAME reducer")
            gameStatus = false;
            let message = action.message;
            loading = action.loading;
            space = undefined;
            console.log("END GAME, action.message: ", message);
            return { ...state, gameStatus, space, message }
        case types.SOCKET_CLOSED:
            return {};
        default:
            return state;
    }
};

const page = (state = {}, action) => {
    let clientError;

    switch (action.type) {
        case types.CLIENT_ERROR:
            console.log("Client error!");
            clientError = action.message;
            return { ...state, clientError };
        case types.SOCKET_CLOSED:
            return {};
        default:
            return state;
    }
}

const reducers = combineReducers({
    game,
    page,
    router: routerReducer,
});

export default reducers;