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
        this.props.setRoom (this.props.name, this.props.roomKey);
        let titleState = {
            title: this.props.name,
            showBackButton: true
        }

        var that = this;
        let roomRef = database.ref('rooms/' + this.props.roomKey + '/roommates/list');
        let roommates = []

        roomRef.once("value").then(function(snapshot) {
            roommates = Object.values(snapshot.val());
            console.log ("Initial roommates");
            console.log (roommates);

            let index = roommates.indexOf(that.props.username);
            let size = roommates.length;

            // add to room if not already in room
            if (index == -1) {
                roommates.push (that.props.username);
                console.log (roommates);
                database.ref('rooms/' + that.props.roomKey + '/roommates').set({
                    list: roommates
                });
            }
        })


        //if (shouldAddRoommate) {
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
           // let newRoommate = roomRef.push(this.props.username);
        // }

        this.props.changeTitleBarCallback(titleState);
        browserHistory.push('/mobile/rooms/'+this.props.name);
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setRoom: (roomName, roomKey) => {
            console.log ("updating to"+roomName);
            dispatch (updateRoom(roomName, roomKey));
        }
    };
}

function mapStateToProps (state, ownProps) {
    return ({
        currentRoom: state.currentRoom,
        currentRoomKey: state.currentRoomKey,
        username: state.username,
        fullname: state.fullname
    });
}

const RoomListObjectContainer = connect (mapStateToProps, mapDispatchToProps)(RoomListObject)
export default RoomListObjectContainer;
