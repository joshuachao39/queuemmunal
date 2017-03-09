import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';
import {ListGroup, FormControl, ControlLabel, FormGroup, Glyphicon, Nav, NavItem} from 'react-bootstrap'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import Fuse from 'fuse.js';

import RoomListObject from './RoomListObject'
import exit from '../assets/closeIcon.svg';
import '../styles/styles.css';
import '../../node_modules/animate.css';

// firebase realtime db
import {database} from '../database/init';
var roomsRef = database.ref('rooms/');

const experiment_variation = window.experiment_variation;

console.log("In the rooms page, the experiment variation is: " + experiment_variation);


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
    // width: "50vw",
    border: "none",
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20
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
        let publicStatus;
        let buttonPublicText;
        if (this.state.createRoomActiveKey === 1) {
            publicStatus = true;
            buttonPublicText = "public";
        } else {
            publicStatus = false;
            buttonPublicText = "private";
        }

        return (
            <div style={containerStyle}>
                <div>
                    <input style={searchStyle} type="search" value={this.state.searchQuery} placeholder="Search for room ID or keyword..." onChange={this.handleSearch}/>
                    {this.state.clearSearchButton}
                </div>
                <div style={{overflow: "auto", maxHeight: "60vh", minHeight: "60vh", width: "90%", background: "#FFF", borderRadius: 15}}>
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
                                <NavItem eventKey={1}>Public </NavItem>
                                <NavItem eventKey={2}>Private </NavItem>
                            </Nav>
                        </div>
                        <div style={contentStyle}>
                            <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", justifyContent: "space-around", alignItems: "center"}}>
                                <div style={{width: "100%"}}>
                                    <p style={addRoomHeadingStyle}>Name</p>
                                    <input style={formStyle} type="text" value={this.state.addRoomName} placeholder="Enter your room name here" onChange={this.handleNameChange} />
                                </div>
                                <button style={createRoomButtonStyle} onClick={this.handleCreateRoom}>Create your {buttonPublicText} room!</button>
                            {/* ADD MORE SHIT HERE LATER! */}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    },
    componentDidMount: function() {
        let that = this;
        roomsRef.on('child_added', function(data) {

            /*let roomCount;
            if (data.val().roommates !== undefined) {
                roomCount = Object.keys(data.val().roommates).length;
            }
            roomCount = roomCount - 1;
            let newRoom = Object.assign ({}, {
                name: data.val().name,
                count: roomCount,
                key: data.val().key
            }); */

            let rooms = that.state.rooms;
            rooms.push ({
                name: data.val().name,
                count: 0,
                key: data.key
            });
            that.setState ({
                rooms: rooms
            })
        });

        roomsRef.on('child_removed', function(data) {
            let currentRooms = that.state.rooms;
            console.log(currentRooms);
            for (var i = currentRooms.length - 1; i >= 0; i--) {
                if (currentRooms[i].key == data.key) {
                    currentRooms.splice(i, 1);
                    break;
                }
            }

            that.setState({
                rooms: currentRooms
            })
        });

        // gotta update when people are logging into rooms and shit??
    },
    getInitialState: function() {
        return ({
            createModalIsOpen: false,
            createRoomActiveKey: 1,
            searchQuery: "",
            addRoomName: "",
            addRoomRoommateCap: 50,
            addRoomSongCap: -1,
            rooms: [],
            justAddedRoom: false,
            clearSearchButton: null
        });
    },

    renderItem(index, key) {
        return <RoomListObject changeTitleBarCallback={this.props.changeTitleBarCallback} 
                               name={this.state.rooms[index].name} 
                               count={this.state.rooms[index].count} 
                               roomKey={this.state.rooms[index].key}
                               key={key} />
    },

    clearSearch: function() {
        let allRooms = [];
        database.ref('/rooms').once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                allRooms.push({
                    name: childSnapshot.val().name,
                    count: childSnapshot.val().count,
                    key: childSnapshot.key
                })
            })
        })
        this.setState({
            searchQuery: "",
            rooms: allRooms,
            clearSearchButton: null
        })
    },

    handleSearch(event) {
        if (event.target.value !== '') {
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
                searchQuery: event.target.value,
                rooms: result,
                clearSearchButton: <button style={{position: "absolute", 
                                                   height: 25, 
                                                   width: 25, 
                                                   right: "8vw", 
                                                   top: 7, 
                                                   border: "none", 
                                                   background: "#FF6D7F", 
                                                   color: "white", 
                                                   borderRadius: "50%", 
                                                   fontFamily: "Quicksand"
                                                  }}
                                            onClick={this.clearSearch}>x</button>
            });
        } else {
           this.clearSearch();
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

        // CHECK FOR ROOM CREATION VALIDATION HERE!!!!

        console.log ("writing " + this.state.addRoomName)
        let newRoom = roomsRef.push({
            name: this.state.addRoomName,
            admin: this.props.username,
            public: this.state.createRoomActiveKey === 1
        });

        roomsRef.child(newRoom.key + '/roommates').push({
            name: this.props.username
        })



        /*let newTitle = {
            title: this.state.addRoomName,
            showBackButton: true
        } */
        
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

function mapStateToProps (state, ownProps) {
    return {
        username: state.username,
        fullname: state.fullname
    }
}

const RoomsContainer = connect(mapStateToProps) (Rooms);
export default RoomsContainer;