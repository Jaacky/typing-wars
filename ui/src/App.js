import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom'

import RouteWrapper from 'helpers/RouteWrapper';
import Nav from 'components/Nav';
import GameRoom from 'components/GameRoom';
import GameRoomForm from 'components/GameRoomForm';
import { createRoom, enterRoom , playerReadyAction, startGameAction, sendUserAction } from 'actions';

import styles from 'styles/App';

const MAX_NUM_PLAYERS = 2;

// testing purposes
import GameMap from 'components/GameMap';
import stylesTest from 'styles/GameRoom';
// end testing purposes

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let _this = this;
        if (_this.props.gameStatus) {
            document.addEventListener('keyup', function(event) {
                if (event.defaultPrevented) {
                    return;
                }
                let key = event.key || event.keyCode;
                let letterRegex = RegExp(/[a-z]/i);

                if (key.length == 1 && letterRegex.test(key)) {
                    // console.log("Letter!", key);
                    _this.props.sendUserAction({ key })
                }
                event.preventDefault();

                // switch (event.key) {
                //     case "Down": // IE specific value
                //     case "ArrowDown":
                //         // Do something for "down arrow" key press.
                //     case "Up": // IE specific value
                //     case "ArrowUp":
                //         // Do something for "up arrow" key press.
                //     case "Left": // IE specific value
                //     case "ArrowLeft":
                //         // Do something for "left arrow" key press.
                //     case "Right": // IE specific value
                //     case "ArrowRight":
                //         // Do something for "right arrow" key press.
                //     case "Enter":
                //         // Do something for "enter" or "return" key press.
                //     case "Escape":
                //         // Do something for "esc" key press.
                //         break;
                    
                //     default:
                //         return; // Quit when this doesn't handle the key event.
                // }
            });
        }

        let testBase = { owner: "me", position: { x: 50, y: 50}, hp: 100, size: 6 }
        let testUnit = { owner: "me", position: { x: 50, y: 25}, word: "fabooolus", typed: 3, size: 2 }
        let testTargets = { "me": testUnit }
        let testSpace = { bases: [testBase], units: [testUnit], targets: testTargets };
        // let testProps = { space: testSpace }
        let testMessage = "Player 2 has been defeated";
        return (
            <div>
                <Nav />
                <div className={styles.Main}>
                    <Switch>
                        <RouteWrapper exact path="/" component={GameRoomForm} 
                            createRoom={this.props.createRoom}
                            enterRoom={this.props.enterRoom}
                            clientError={this.props.clientError}
                        />
                        <RouteWrapper path="/gameroom" component={GameRoom}
                            loading={this.props.loading}
                            roomId={this.props.roomId} 
                            clientId={this.props.clientId} 
                            players={this.props.players} 
                            playerReady={this.props.playerReady}
                            playerStatuses={this.props.playerStatuses}
                            startFlag={this.props.startFlag}
                            startGame={this.props.startGame}
                            gameStatus={this.props.gameStatus}
                            message={testMessage}
                            space={this.props.space}
                            roomSize={MAX_NUM_PLAYERS}
                        />
                    </Switch>
                </div>
                {/* testing purposes */}
                {/* <div className={stylesTest.Display}>
                    <GameMap
                        clientId="me"
                        space={testSpace}
                    />
                </div> */}
                {/* end testing purposes */}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("State change", state);
    return {
        loading: state.game.loading,
        roomId: state.game.roomId,
        clientId: state.game.clientId,
        players: state.game.players,
        playerStatuses: state.game.playerStatuses,
        startFlag: state.game.startFlag,
        gameStatus: state.game.gameStatus,
        roomNumber: state.game.roomNumber,
        message: state.game.message,
        space: state.game.space,

        clientError: state.page.clientError,

        location: state.router.location,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createRoom: state => {
            dispatch(createRoom(state.username));
        },
        enterRoom: state => {
            dispatch(enterRoom(state.username, state.roomId))
        },
        playerReady: readyFlag => {
            dispatch(playerReadyAction(readyFlag))
        },
        startGame: () => {
            dispatch(startGameAction());
        },
        sendUserAction: (action) => {
            dispatch(sendUserAction(action));
        },
    }
}

const AppContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))

// const AppContainer =connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App)

export default AppContainer;

