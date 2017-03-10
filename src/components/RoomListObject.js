import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {updateRoom} from '../redux/actions';

import {database} from '../database/init';

let roomStyle = {
    padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    borderBottom: "1px solid #C7C7C7"
}

class RoomListObject extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            roommateCount: 0
        }
        this.enterRoom = this.enterRoom.bind(this);
    }

    render () {
        return (
            <div style={roomStyle} onClick={this.enterRoom}>
                <p style={{fontSize: 20, color: "#070707", marginBottom: 5, marginLeft: 5}}>{this.props.name}</p>
                <p style={{fontSize: 13, color: "#6F6F6F", marginLeft: 5}}>{this.state.roommateCount} roommates</p>
            </div>
        )
    }

    componentWillMount() {
        let that = this;
        let roommates = 0;
        database.ref('rooms/' + this.props.roomKey + '/roommates/list').on("child_added", function(snapshot) {
            roommates++;
            that.setState({
                roommateCount: roommates
            })
        })
        database.ref('rooms/' + this.props.roomKey + '/roommates/list').on("child_removed", function(snapshot) {
            roommates--;
            that.setState({
                roommateCount: roommates
            })
        })
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

            if (snapshot.val() !== null) {
                roommates = Object.values(snapshot.val());
            }
            else {
                roommates = []
            }

            let index = roommates.indexOf(that.props.username);

            // add to room if not already in room
            if (index === -1) {

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
