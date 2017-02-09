import React from 'react'
import {ListGroupItem, Glyphicon} from 'react-bootstrap'
import { browserHistory } from 'react-router';


let roomStyle = {
    padding: "10px",
    margin: "1px",
    height: "80px",
}

let glyphStyle = {
    position: "absolute",
    right: "20",
    top: "50%",
    size: "150%"
}

class RoomListObject extends React.Component {

    constructor (props) {
        super (props);
        this.enterRoom = this.enterRoom.bind(this);
    }

    render () {
        return (
            <ListGroupItem style={roomStyle} onClick={this.enterRoom}>
                <h4>{this.props.name}</h4>
                <p>{this.props.count} roommates</p>
                <Glyphicon style={glyphStyle} glyph="chevron-right"/>
            </ListGroupItem>
        )

    }

    enterRoom (e) {
        e.preventDefault();
        browserHistory.push('/mobile/rooms/room1');
    }
}


export default RoomListObject;
