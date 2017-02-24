import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import {updateRoom} from '../redux/actions';

import {database} from '../database/init';

let roomStyle = {
    padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    borderBottom: "1px solid #C7C7C7"
}

let glyphStyle = {
    position: "absolute",
    right: "20px",
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
            <div style={roomStyle} onClick={this.enterRoom}>
                <p style={{fontSize: 20, color: "#070707", marginBottom: 5, marginLeft: 5}}>{this.props.name}</p>
                <p style={{fontSize: 13, color: "#6F6F6F", marginLeft: 5}}>{this.props.count} roommates</p>
            </div>
        )
    }

    enterRoom (e) {
        e.preventDefault();
        this.props.setRoom (this.props.name);
        let titleState = {
            title: this.props.name,
            showBackButton: true
        }

        let roomRef = database.ref('rooms/' + this.props.roomKey + '/roommates');
        let roommatesInTheRoom;
        let shouldAddRoommate = true;

        roomRef.on("value", function(snapshot) {
            roommatesInTheRoom = Object.keys(snapshot.val()).map(function(key) { return snapshot.val()[key]});
        })
        // only push roommate if we aren't in that group already. if you're in another room, leave that room first.
        for (let i=0; i<roommatesInTheRoom.length; i++) {
            if (this.props.username === roommatesInTheRoom[i]) {
                shouldAddRoommate = false;
                break;
            } 
        }
        if (shouldAddRoommate) {
            // check if you're in another room first.
            /*if (this.props.currentRoom !== '') {
                let allRooms = database.ref('/rooms');
                allRooms.once('value').then(function(snapshot) {
                    let roomArray = Object.keys(snapshot.val()).map(function(key) { return snapshot.val()[key]});
                    for(let i=0; i < roomArray.length; i++) {
                        console.log("FUCKKKK");
                        let roommateArray = Object.keys(roomArray[i].roommates).map(function(key) { return roomArray[i].roommates[key]});
                        for (let j=0; j < roommateArray.length; j++) {
                            if (this.props.currentRoom)
                        } 
                    }
                })
            } */
            let newRoommate = roomRef.push(this.props.username);
        }

        this.props.changeTitleBarCallback(titleState);
        browserHistory.push('/mobile/rooms/'+this.props.name);
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setRoom: (roomName) => {
            console.log ("updating to"+roomName);
            dispatch (updateRoom(roomName));
        }
    };
}

function mapStateToProps (state, ownProps) {
    return ({
        currentRoom: state.currentRoom,
        username: state.username,
        fullname: state.fullname
    }); 
}

const RoomListObjectContainer = connect (mapStateToProps, mapDispatchToProps)(RoomListObject)
export default RoomListObjectContainer;
