import React, { Component } from 'react';
import { Redirect } from 'react-router';
import GameMap from 'components/GameMap';

import styles from 'styles/GameRoom';

class GameRoom extends Component {
    constructor(props) {
        super(props);
    }

    handleReadyToggle = () => {
        let readyFlag = !this.props.playerStatuses[this.props.clientId].ready;
        this.props.playerReady(readyFlag);
    }

    render() {
        console.log("Game room this.props", this.props);
        if (this.props.loading) {
            return <h1>Loading</h1>
        }
        let players;
        if (!this.props.clientId || !this.props.players) {
            console.log("Redirecting to home from game room", this.props);
            return (
                <Redirect to="/" />
            )
        }

        players = this.props.players;

        let playersDisplay = []
        if (playersDisplay.length < this.props.roomSize) {
            while (playersDisplay.length < this.props.roomSize) {
                playersDisplay.push(
                    <li className={styles.Player}>Waiting for another player...</li>
                )
            }
        }

        // Update playersDisplay list
        Object.keys(players).map((clientId) => {
            let player = players[clientId];
            let playerStatus = this.props.playerStatuses[player.id];
            // console.log("Generating player display: ", player)
            playersDisplay[playerStatus.index] = (
            <li className={`
                ${styles.Player}
                ${this.props.clientId === player.id ? styles.You : ''}
                ${playerStatus.ready ? styles.PlayerReady : ''}
            `}>
                {player.username}
            </li>
            )
        })

        let message;
        if (this.props.message) {
            console.log("Prop message:", this.props.message);
            message = <div className={styles.Message}>
                <h3>{this.props.message}</h3>
                <span className={styles.Close}>
                    <div></div>
                    <div></div>
                </span>
            </div>
        }

        let display = this.props.gameStatus
            ? 
                <div className={styles.Display}>
                    <GameMap
                        clientId={this.props.clientId}
                        players={players}
                        space={this.props.space}
                    />
                </div>
            : <div className={styles.Display}>
                <ul>
                    {playersDisplay}
                    <li>
                        <button className={`${styles.Button} ${this.props.playerStatuses[this.props.clientId].ready ? styles.readyButton : ''}`} onClick={this.handleReadyToggle}>Ready</button>
                    </li>
                    <li>
                        <button className={styles.Button} onClick={this.props.startGame} disabled={!this.props.startFlag}>Start</button>
                    </li>
                </ul>
            </div>

        return (
            <div className={styles.GameRoom}>
                <div className={styles.Header}>
                    <h1>Room ID: {this.props.roomId}</h1>
                </div>
                {/* {message} */}
                {display}
                {/* <GameMap /> */}
            </div>
        )
    }
}

export default GameRoom;