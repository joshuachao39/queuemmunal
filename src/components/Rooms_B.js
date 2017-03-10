import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';
import { Glyphicon, Nav, NavItem} from 'react-bootstrap'
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

let privateRoomModalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)"
    },
    content: {
        borderRadius: 15,
        border: "none",
        background: "#F4F4F8",
        fontFamily: "Quicksand",
        top                   : '50%',
        left                  : '20%',
        right                 : '20%',
        bottom                : 'auto',
        marginRight           : '-20%',
        transform             : 'translate(-13%, -50%)',

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


let searchStyle = {
    /* Field: */
    background: "#FFFFFF",
    border: "0 solid rgba(77,77,77,0.78)",
    fontFamily: "Quicksand",
    fontSize: 14,
    color: "#C7C7CD",
    letterSpacing: -0.08,
    padding: 10,
    width: "65vw",
    borderRadius: 15
};

let errorStyle = {
    fontSize: 15,
    color: "#FF6D7F",
    fontFamily: "Quicksand",
    maxWidth: "90vw",
    textAlign: "center",
    marginTop: 5
};



let Rooms = React.createClass({

    render: function() {
        //let publicStatus;
        let buttonPublicText;
        let generatedKey;
        if (this.state.createRoomActiveKey === 1) {
            buttonPublicText = "public";
        } else {
            buttonPublicText = "private";
            generatedKey = 
                <div style={{display: "flex", 
                             justifyContent: "center", 
                             alignItems: "center", 
                             flexDirection: "column",
                             marginTop: 20,
                             border: "1px solid black",
                             borderRadius: 15,
                             padding: 15
                }}>
                    <p style={{fontSize: 16, marginBottom: 0}}> Your private password is: </p>
                    <p style={{fontSize: 50, fontFamily: "Courier New", marginBottom: 0}}> {this.state.randomKey} </p>
                    <p style={{textAlign: "center", width: this.props.width * 0.6}}> Share this <strong>case-sensitive</strong> code to your friends! You can view this code anytime in your room. </p>
                </div>;
        }

        return (
            <div style={containerStyle}>
                <div style={{width: "90%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20}}>
                    <input style={searchStyle} type="text" value={this.state.searchQuery} placeholder="Search by keyword..." onChange={this.handleSearch}/>
                    <button style={{marginLeft: 10,
                                    fontFamily: "Quicksand",
                                    fontSize: 12,
                                    color: "white",
                                    maxWidth: "30vw",
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    borderRadius: 15,
                                    borderStyle: "none",
                                    background: "#FF6D7F",
                                    fontWeight: "bold"
                                    }}
                            className="animated pulse infinite"
                            onClick={this.openPrivateRoomModal}> Enter<br/>Private Room </button>
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
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeModal}
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
                                {generatedKey}
                                <button style={createRoomButtonStyle} onClick={this.handleCreateRoom}>Create your {buttonPublicText} room!</button>
                            {/* ADD MORE SHIT HERE LATER! */}
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.privateModalIsOpen}
                    contentLabel="Enter Private Room"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closePrivateRoomModal}
                    style={privateRoomModalStyle}>
                        <div style={containerStyle}>
                            <img src={exit} className="exitStyle animated bounceIn" alt="exit" onClick={this.closePrivateRoomModal}/>
                            <div style={exitContainerStyle}>
                                <div style={titleStyle}>
                                    ENTER PRIVATE ROOM
                                </div>
                            </div>
                            <div style={contentStyle}>
                                <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", justifyContent: "space-around", alignItems: "center"}}>
                                    <div style={{width: "100%"}}>
                                        <p style={addRoomHeadingStyle}>Password</p>
                                        <input style={formStyle} type="text" value={this.state.privateRoomKey} placeholder="Enter the private key password here" onChange={this.handlePrivateRoomKeyChange} />
                                    </div>
                                    {this.state.errorText}
                                    <button style={createRoomButtonStyle} onClick={this.handlePrivateRoomEnter}>Enter private room!</button>
                                {/* ADD MORE SHIT HERE LATER! */}
                                </div>
                            </div>
                        </div>
                </Modal>
            </div>
        );
    },
    closePrivateRoomModal: function() {
            this.setState({
                privateModalIsOpen: false
            })
    },
    openPrivateRoomModal: function() {
        this.setState({
            privateModalIsOpen: true
        })
    },
    componentDidMount: function() {
        let that = this;
        roomsRef.on('child_added', function(data) {

            let rooms = that.state.rooms;
            rooms.push ({
                name: data.val().name,
                count: 0, // could be iffy
                key: data.key,
                public: data.val().public,
                admin: data.val().admin
            });
            that.setState ({
                rooms: rooms
            })
        });

        roomsRef.on('child_removed', function(data) {
            let currentRooms = that.state.rooms;
            console.log(currentRooms);
            for (var i = currentRooms.length - 1; i >= 0; i--) {
                if (currentRooms[i].key === data.key) {
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
            privateModalIsOpen: false,
            createRoomActiveKey: 1,
            songQuery: "",
            addRoomName: "",
            addRoomRoommateCap: 50,
            addRoomSongCap: -1,
            rooms: [],
            justAddedRoom: false,
            privateRoomKey: "",
            errorText: null,
            randomKey: this.generateRandomKey()
        });
    },

    renderItem(index, key) {
        if (this.state.rooms[index].public === true || this.state.rooms[index].admin === this.props.username) {
            return <RoomListObject changeTitleBarCallback={this.props.changeTitleBarCallback}
                                   name={this.state.rooms[index].name}
                                   count={this.state.rooms[index].count}
                                   roomKey={this.state.rooms[index].key}
                                   key={key} />
        }
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
                songQuery: event.target.value,
                rooms: result
            });
        } else {
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
                songQuery: event.target.value,
                rooms: allRooms
            })
        }
    },
    handleCreateRoomSelect: function(eventKey) {
        if (this.state.createRoomActiveKey !== eventKey) {
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
        if (this.state.createRoomActiveKey == 1) {
            let newRoom = roomsRef.push({
                name: this.state.addRoomName,
                admin: this.props.username,
                public: true
            });
            let roommates = [this.props.username];
            roomsRef.child(newRoom.key + '/roommates').push({
                list: roommates
            })
        } else {
            let randomKey = this.state.randomKey;
            roomsRef.child(randomKey).set({
                name: this.state.addRoomName,
                admin: this.props.username,
                public: false
            });
            let roommates = [this.props.username];
            roomsRef.child(randomKey + '/roommates').push({
                list: roommates
            })
        }


        this.setState({
            addRoomName: ""
        })
    },
    enterPrivateRoom: function(privateRoom) {
        if (privateRoom.name !== undefined && privateRoom.key !== undefined) {
            console.log("private room name is: " + privateRoom.name);
            /*let titleState = {
                name: privateRoom.name,
                showBackButton: true
            }
             this.props.changeTitleBarCallback(titleState); */
            // consider adding to roommates here?
            this.setState({
                errorText: null
            })
            browserHistory.push('/mobile/rooms/' + privateRoom.name);
        } else {
            this.setState({
                errorText: <p style={errorStyle}>Sorry! We couldn't find a private room associated with that password...</p>
            })
        }
    },
    generateRandomKey: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 6; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    checkIfPrivateRoomExists: function(callback) {
            let that = this;
            database.ref('/rooms').once('value', function(snapshot) {
                let name;
                let key;
                snapshot.forEach( function(childSnapshot) {
                    if (childSnapshot.val().public === false && that.state.privateRoomKey === childSnapshot.key) {
                        name = childSnapshot.val().name;
                        key = childSnapshot.key;
                        return true;
                    }
                });
                let privateRoom = {
                    name: name,
                    key: key
                };
                 callback(privateRoom);
            })
    },
    handlePrivateRoomEnter: function() {
        this.checkIfPrivateRoomExists(this.enterPrivateRoom);
    },
    handleNameChange: function(event) {
        this.setState({addRoomName: event.target.value});
    },
    handlePrivateRoomKeyChange: function(event) {
        this.setState({privateRoomKey: event.target.value});
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
        fullname: state.fullname,
        width: state.width
    }
}

const RoomsContainer_B = connect(mapStateToProps) (Rooms);
export default RoomsContainer_B;
