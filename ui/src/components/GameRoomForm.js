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

    handleRoomIdChange = event => {
        this.setState({roomId: event.target.value})
    }

    validUserName = () => {
        return this.state.username.length > 0;
    }

    validRoomId = () => {
        return this.state.roomId.length > 0
    }

    handleCreateGameRoom = (event) => {
        event.preventDefault();
        if (this.validUserName()) {
            this.props.createRoom(this.state);
        }
    }

    handleEnterGameRoom = (event) => {
        event.preventDefault();
        if (this.validUserName() && this.validRoomId()) {
            this.props.enterRoom(this.state);
        }
    }

    render() {
        return (
            <div className={styles.Container}>
                <div className={styles.GameRoomForm}>
                    <h1 className={styles.Headline}>TYPING WARS</h1>
                    <div>
                        <input className={styles.Field} type="text" placeholder="Username" 
                            onChange={this.handleUsernameChange} 
                            value={this.state.username}
                        />
                    </div>
                    {/* <span>/</span> */}
                    <form onSubmit={this.handleCreateGameRoom} >
                        <input type="submit" value="Create Game Room" />
                    </form>
                    {/* <span>/</span> */}
                    <form onSubmit={this.handleEnterGameRoom} >
                        <input className={styles.Field} placeholder="Room ID" onChange={this.handleRoomIdChange} value={this.state.roomId} />
                        <input type="submit" value="Join Game Room" />
                    </form>
                </div>
                <div className={`
                    ${styles.ClientErrorDisplay}
                    ${this.props.clientError ? styles.active : ''}
                `}>
                    <p className={styles.ClientError}>{this.props.clientError}</p>
                </div>
            </div>
        )
    }
}

export default GameRoomForm;