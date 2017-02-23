import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';
import {ListGroup, FormControl, ControlLabel, FormGroup, Glyphicon, Nav, NavItem} from 'react-bootstrap'
import { browserHistory } from 'react-router';
import ReactList from 'react-list';
import Fuse from 'fuse.js';

import RoomListObject from './RoomListObject'
import exit from '../assets/closeIcon.svg';
import '../styles/styles.css';
import '../../node_modules/animate.css';

// firebase realtime db
import {database} from '../database/init';
var roomsRef = database.ref('rooms/');


/* the lower right hand button must be set to position absolute, not fixed, in order to work */
let buttonStyle = {
    background: "#FF6D7F",
    boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
    borderRadius: "50%",
    fontFamily: "Quicksand",
    fontSize: 16,
    color: "white",
    width: 90,
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "absolute",
    bottom: 15,
    right: 15
}

let createRoomButtonStyle = {
    /* Button Background: */
    background: "#FF6D7F",
    borderRadius: 80,
    /* Login: */
    fontFamily: "Quicksand",
    fontSize: 18,
    color: "#FFFFFF",
    letterSpacing: 0,
    width: "50vw",
    border: "none",
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 40
};

let titleStyle = {
    width: "100%",
    height: ($(window).height() / 480) * 25,
    fontFamily: "Quicksand",
    fontSize: 18,
    color: "#3066BE",
    borderBottom: "1px solid #3066BE",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
}

let addRoomHeadingStyle = {
    marginTop: 5,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold"
}

let formStyle = {
    /* Field: */
    background: "#FFFFFF",
    border: "0 solid rgba(77,77,77,0.78)",
    /* Text within the field */
    fontFamily: "Quicksand",
    fontSize: 14,
    color: "#C7C7CD",
    letterSpacing: -0.08,
    padding: 10,
    width: "100%"
};


let containerStyle = {
    width: "100%",
    // maybe add height 100% here for modal
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",

}

let createRoomModalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)"
    },
    content: {
        borderRadius: 15,
        border: "none",
        background: "#F4F4F8",
        fontFamily: "Quicksand"
    }
}

let contentStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-around",
    alignItems: "center"
}

let exitContainerStyle = {
    width: "100%"
}

let listStyle = {
    width: "90%",
    /*justifyContent: "center",
    alignContent: "center",
    margin: 0,
    overflowY: "scroll" */
}

let searchStyle = {
	/* Field: */
	background: "#FFFFFF",
	border: "0 solid rgba(77,77,77,0.78)",
	fontFamily: "Quicksand",
	fontSize: 14,
	color: "#C7C7CD",
	letterSpacing: -0.08,
	padding: 10,
	width: "90vw",
	marginBottom: 20,
	borderRadius: 15
};



let Rooms = React.createClass({

    render: function() {
        return (
            <div style={containerStyle}>

                <input style={searchStyle} type="text" value={this.state.searchQuery} placeholder="Search for room ID or keyword..." onChange={this.handleSearch}/>

                <div style={{overflow: "auto", maxHeight: "500px", minHeight: "500px", width: "90%", background: "#FFF", borderRadius: 15}}>
                    <ReactList itemRenderer={this.renderItem} length={this.state.rooms.length} type="uniform" />
                </div>

                <div onClick={this.createRoom} style={buttonStyle} className="animated bounceIn">
                    <Glyphicon style={{fontSize: 30}} glyph="plus" />
                </div>

                <Modal
                    isOpen={this.state.createModalIsOpen}
                    contentLabel="Create Room Modal"
                    style={createRoomModalStyle}>
                    <div style={containerStyle}>
                        <img src={exit} className="exitStyle animated bounceIn" alt="exit" onClick={this.closeModal}/>
                        <div style={exitContainerStyle}>
                            <div style={titleStyle}>
                                CREATE A ROOM
                            </div>
                            <Nav bsClass="addRoomTabBar" bsStyle="pills" activeKey={this.state.createRoomActiveKey} onSelect={this.handleCreateRoomSelect}>
                                <NavItem eventKey={1}>Private </NavItem>
                                <NavItem eventKey={2}>Public </NavItem>
                            </Nav>
                        </div>
                        <div style={contentStyle}>
                            <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", justifyContent: "space-around", alignItems: "center"}}>
                                <div style={{width: "100%"}}>
                                    <p style={addRoomHeadingStyle}>Name</p>
                                    <input style={formStyle} type="text" value={this.state.addRoomName} placeholder="Enter your room name here" onChange={this.handleNameChange} />
                                </div>
                                <button style={createRoomButtonStyle} onClick={this.handleCreateRoom}>Create your room!</button>
                            {/* ADD MORE SHIT HERE LATER! */}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    },
    getInitialState: function() {

        let that = this;
        roomsRef.on('child_added', function(data) {

            let roomCount = 0;
            if (data.val().roommates !== undefined) {
                roomCount = data.val().roommates.length;
            }
            let newRoom = Object.assign ({}, {
                name: data.val().name,
                count: roomCount
            });

            let rooms = that.state.rooms;
            rooms.push (newRoom);
            that.setState ({
                rooms: rooms
            })

            console.log (that.state.rooms);
        });

        roomsRef.on('child_removed', function(data) {
            console.log (data.key);
        });

        return ({
            createModalIsOpen: false,
            createRoomActiveKey: 1,
            songQuery: "",
            addRoomName: "",
            addRoomRoommateCap: 50,
            addRoomSongCap: -1,
            rooms: []
        });
    },

    renderItem(index, key) {
        return <RoomListObject changeTitleBarCallback={this.props.changeTitleBarCallback} name={this.state.rooms[index].name} count={this.state.rooms[index].count} songs={this.state.rooms[index].songs} key={key} />
    },

    handleSearch(event) {
        if (event.target.value != '') {
            var options = {
              shouldSort: true,
              threshold: 0.6,
              location: 0,
              distance: 100,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: [
                "name",
                "id"
                ]
            };
            var fuse = new Fuse(this.state.rooms, options); // "list" is the item array
            var result = fuse.search(event.target.value + "");
            this.setState({
                songQuery: event.target.value,
                rooms: result
            });
        } else {
            this.setState({
                songQuery: event.target.value,
                rooms: this.state.rooms
            })
        }
    },
    handleCreateRoomSelect: function(eventKey) {
        if (this.state.createRoomActiveKey != eventKey) {
            this.setState({
                createRoomActiveKey: eventKey
            });
        }
    },
    handleCreateRoom: function() {
        this.closeModal();
        //data.rooms.unshift({name: this.state.addRoomName, count: 1});

        console.log ("writing" + this.state.addRoomName)
        var newRoom = roomsRef.push();
        newRoom.set ({
            name: this.state.addRoomName,
            roommates: [],
            songList: []
        })


        this.setState({
            addRoomName: ""
        })
    },
    handleNameChange: function(event) {
        this.setState({addRoomName: event.target.value});
    },
    createRoom: function() {
        this.setState({
            createModalIsOpen: true
        });
    },

    closeModal: function() {
        this.setState({
            createModalIsOpen: false
        })
    }
});


export default Rooms;
