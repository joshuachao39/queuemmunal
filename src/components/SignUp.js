import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';
import {ListGroup, FormControl, ControlLabel, FormGroup, Glyphicon, Nav, NavItem} from 'react-bootstrap'
import { browserHistory } from 'react-router';
import ReactList from 'react-list';

import RoomListObject from './RoomListObject'
import '../styles/styles.css';
import '../../node_modules/animate.css';



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

let createAccountButtonStyle = {
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
    boxShadow: "0 2px 9px 0 rgba(0,0,0,0.18)",
    /* Text within the field */
    fontFamily: "Quicksand",
    fontSize: 14,
    color: "#C7C7CD",
    letterSpacing: -0.08,
    padding: 10,
    width: "80vw",
    margin: "auto"
};


let containerStyle = {
    width: "90%",
    // maybe add height 100% here for modal
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    margin: "auto",
    //background: "#F4F4F8"
}

let pageStyle = {
    background: "#F4F4F8",
    height: "100%"
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

let errorStyle = {
    fontSize: 15,
    color: "#FF6D7F",
    fontFamily: "Quicksand",
    maxWidth: "80vw",
    textAlign: "center",
    paddingTop: 3
}

let signUpStyle = {
    fontSize: 15,
    paddingTop: 10,
    fontFamily: "Quicksand",
    color: "#3066BE"
}


export default React.createClass({

    render: function() {
        let backText = "< back"
        return (
            <div style={pageStyle}>
                <div style={containerStyle}>
                    <div style={exitContainerStyle}>
                        <div style={titleStyle}>
                            <button onClick={this.handleCancel} 
                                    style={{position: "fixed", left: 15, top: 22, borderStyle: "none", backgroundColor: "transparent"}}> 
                                        {backText} 
                            </button>
                            CREATE A LOGIN
                        </div>
                    </div>
                    <div style={contentStyle}>
                        <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", justifyContent: "space-around", alignItems: "center"}}>
                            <div style={{width: "80vw", marginTop: 20}}>
                                <p style={addRoomHeadingStyle}> Username </p>
                                <input style={formStyle} type="text" value={this.state.usernameText} placeholder="Enter a username here" onChange={this.handleUsernameChange} />
                            </div>

                            <div style={{width: "80vw", marginTop: 30}}>
                                <p style={addRoomHeadingStyle}> Password </p>
                                <input style={formStyle} type="password" value={this.state.passwordText} placeholder="Enter your password here" onChange={this.handlePasswordChange} />
                            </div>

                            <div style={{width: "80vw", marginTop: 30}}>
                                <p style={addRoomHeadingStyle}> Re-enter Password: </p>
                                <input style={formStyle} type="password" value={this.state.passwordCheckText} placeholder="Re-enter your password here" onChange={this.handlePasswordCheck} />
                            </div>
                            {this.state.errorText}

                            <button className="animated fadeIn" style={createAccountButtonStyle} onClick={this.handleAccountCreation}>Create your account!</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    getInitialState: function() {
        return ({
            createModalIsOpen: false,
            createRoomActiveKey: 1,
            addRoomName: "",
            addRoomRoommateCap: 50,
            addRoomSongCap: -1
        });
    },
    handleCreateRoomSelect: function(eventKey) {
        if (this.state.createRoomActiveKey !== eventKey) {
            this.setState({
                createRoomActiveKey: eventKey
            });
        }
    },
    handleAccountCreation: function() {
        this.props.router.push('/mobile');
    },
    handleCancel: function() {
        this.props.router.push('/');
    },
    handleUsernameChange: function(event) {
        this.setState({usernameText: event.target.value});
    },
    handlePasswordChange: function(event) {
        this.setState({passwordText: event.target.value});
    },
    handlePasswordCheck: function(event) {
        let curr_pass = event.target.value;
        this.setState({passwordCheckText: curr_pass});

        if (this.state.passwordText !== curr_pass) {
            this.setState({errorText: <p style={errorStyle}> Passwords don't match! </p>});
        }
        else {
            this.setState({errorText: null});
        }
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
