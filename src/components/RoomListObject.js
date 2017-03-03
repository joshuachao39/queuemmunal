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

        var previousRoomKey = this.props.currentRoomKey;
        var that = this;

        // update state
        this.props.setRoom (this.props.name, this.props.roomKey);

        let roomRef = database.ref('rooms/' + this.props.roomKey+ '/roommates/list');
        let roommates = []

        let titleState = {
            title: this.props.name,
            showBackButton: true
        }

        roomRef.once("value").then(function(snapshot) {
            roommates = Object.values(snapshot.val());
            console.log ("Initial roommates");
            console.log (roommates);

            let index = roommates.indexOf(that.props.username);
            let size = roommates.length;

            // add to room if not already in room
            if (index == -1) {

                // if already in a room, remove from the room
                if (previousRoomKey !== undefined && that.props.roomKey !== previousRoomKey) {

                    // removing from previous room
                    database.ref('rooms/'+previousRoomKey+'/roommates/list').once ("value").then(function(snapshot){
                        let oldRoommates = Object.values (snapshot.val());
                        let oldIndex = oldRoommates.indexOf(that.props.username);

                        if (oldIndex !== -1) {
                            oldRoommates.splice (oldIndex);
                        }

                        database.ref('rooms/'+previousRoomKey+'/roommates').set({
                            list: oldRoommates
                        })
                    })
                }

                // adding to array
                roommates.push (that.props.username);
                // console.log (roommates);
                // console.log (that.props.currentRoomKey)
                database.ref('rooms/' + that.props.roomKey + '/roommates').set({
                    list: roommates
                });
            }
        })

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
