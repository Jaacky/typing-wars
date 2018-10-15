import React, { Component } from 'react';

import styles from 'styles/GameRoomForm';

class GameRoomForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomId: "",
            username: "",
        };
    }

    handleUsernameChange = event => {
        this.setState({username: event.target.value})
    }

    handleOnChange = event => {
        this.setState({roomId: event.target.value})
    }

    handleCreateGameRoom = (event) => {
        event.preventDefault();

        this.props.createGameRoom(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.enterRoom(this.state);
    }

    render() {
        return (
            <div className={styles.GameRoomForm}>
                <div>
                    <input type="text" placeholder="Username" 
                        onChange={this.handleUsernameChange} 
                        value={this.state.username}
                    />
                </div>
                <span>/</span>
                <form onSubmit={this.handleCreateGameRoom} >
                    <input type="submit" value="Create game room" />
                </form>
                <span>/</span>
                <form onSubmit={this.handleSubmit} >
                    <input placeholder="Room ID" onChange={this.handleOnChange} value={this.state.roomId} />
                    <input type="submit" value="Enter" />
                </form>
            </div>
        )
    }
}

export default GameRoomForm;