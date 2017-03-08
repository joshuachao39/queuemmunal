import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';
import {ListGroup, FormControl, ControlLabel, FormGroup, Glyphicon, Nav, NavItem} from 'react-bootstrap'
import { browserHistory } from 'react-router';
import ReactList from 'react-list';
import {connect} from 'react-redux';
import {updateUser} from '../redux/actions';
import RoomListObject from './RoomListObject';
import '../styles/styles.css';
import '../../node_modules/animate.css';

import {database} from '../database/init';



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
    marginTop: 30,
    paddingTop: 7,
    paddingBottom: 7
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

let formHeadingStyle = {
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
    width: "100%",
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

let errorStyle = {
    fontSize: 15,
    color: "#FF6D7F",
    fontFamily: "Quicksand",
    maxWidth: "80vw",
    textAlign: "center",
    marginTop: 15,
}


let SignUp = React.createClass({

    render: function() {
        let backText = "< back"
        return (
            <div style={pageStyle}>
                <div style={containerStyle}>
                    <div style={titleStyle}>
                        <button onClick={this.handleCancel} 
                                style={{position: "fixed", left: 15, top: 22, borderStyle: "none", backgroundColor: "transparent"}}> 
                                    {backText} 
                        </button>
                        CREATE A LOGIN
                    </div>
                    <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", justifyContent: "space-around", alignItems: "center"}}>
                        <div style={{width: "80vw", marginTop: 20}}>
                            <p style={formHeadingStyle}> Username </p>
                            <input style={formStyle} type="text" value={this.state.usernameText} placeholder="Enter a username here" onChange={this.handleUsernameChange} />
                        </div>

                        <div style={{width: "80vw", marginTop: 30}}>
                            <p style={formHeadingStyle}> Password </p>
                            <input style={formStyle} type="password" value={this.state.passwordText} placeholder="Enter your password here" onChange={this.handlePasswordChange} />
                        </div>

                        <div style={{width: "80vw", marginTop: 30}}>
                            <p style={formHeadingStyle}> Re-enter Password: </p>
                            <input style={formStyle} type="password" value={this.state.passwordCheckText} placeholder="Re-enter your password here" onChange={this.handlePasswordCheck} />
                        </div>
                        {this.state.errorText}
                        {this.state.newUserErrorText}
                        <button className="animated fadeIn" style={createAccountButtonStyle} onClick={this.handleOnSubmit}>Create your account!</button>
                    </div>
                </div>
            </div>
        );
    },
    getInitialState: function() {
        return ({
            usernameText: "",
            passwordText: "",
            passwordMatch: false,
            errorText: null,
            newUserErrorText: null
        });
    },
    handleOnSubmit: function() {
        this.checkForExistingUser(this.addNewUser);
    },
    getRandomProfilePicture: function() {
        let profilePictures = [
            "https://firebasestorage.googleapis.com/v0/b/queuemmunal.appspot.com/o/elma.png?alt=media&token=cd71ae9b-80ba-46b9-8441-22a91d4aaf01",
            "https://firebasestorage.googleapis.com/v0/b/queuemmunal.appspot.com/o/fafnir.png?alt=media&token=ab926b49-1a7f-4abf-b591-6c54d86d7924",
            "https://firebasestorage.googleapis.com/v0/b/queuemmunal.appspot.com/o/kanna.png?alt=media&token=a539061c-d569-48cd-93e1-249b7b58b62d",
            "https://firebasestorage.googleapis.com/v0/b/queuemmunal.appspot.com/o/kobayashi.png?alt=media&token=74f779f4-694b-4428-b076-a4061db434f4",
            "https://firebasestorage.googleapis.com/v0/b/queuemmunal.appspot.com/o/lucoa.png?alt=media&token=84308749-41e7-437e-9aa0-93d3b7f593d9",
            "https://firebasestorage.googleapis.com/v0/b/queuemmunal.appspot.com/o/takiya.png?alt=media&token=c2082f35-76bd-4361-9c2e-7b98114de99d",
            "https://firebasestorage.googleapis.com/v0/b/queuemmunal.appspot.com/o/tohru.png?alt=media&token=4c30d2b0-970f-44d7-b026-bc60a6981dc5"
        ];
        let randomIndex = Math.floor(Math.random() * profilePictures.length);
        return profilePictures[randomIndex];
    },
    addNewUser: function(userExists) {
        if (this.state.usernameText === "" || this.state.passwordText === "") {
            this.setState({
                newUserErrorText: <p style={errorStyle}> Username and password fields cannot be blank! </p>
            })
        } else {
            if (this.state.passwordMatch) {
                if (userExists) {
                    this.setState({
                        newUserErrorText: <p style={errorStyle}> Sorry, that username is already taken! </p> 
                    })
                } else {
                    let usersRef = database.ref('/users');
                    let randomProfilePicture = this.getRandomProfilePicture();
                    usersRef.child(this.state.usernameText).set({
                        name: this.state.usernameText,
                        password: this.state.passwordText,
                        pictureUrl: randomProfilePicture
                    })
                    this.props.updateStateUser(this.state.usernameText, this.state.usernameText, randomProfilePicture);
                    this.setState({
                        usernameText: "",
                        passwordText: ""
                    })
                    this.props.router.push('/mobile');

                }
            }
        }
    },
    checkForExistingUser: function(callback) {
        let that = this;
        // IMPORTANT CODE RIGHT HERE
        database.ref('/users').once("value", function(snapshot) {
            let userExists = snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.key === that.state.usernameText) {
                    return true;
                }
            });
            callback(userExists);
        })
    },
    handleCancel: function() {
        this.setState({
            usernameText: "",
            passwordText: ""
        })
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

        if (this.state.passwordText !== curr_pass) {
            this.setState({
                errorText: <p style={errorStyle}> Passwords don't match! </p>,
                passwordMatch: false
            });
        }
        else {
            this.setState({
                errorText: null,
                passwordMatch: true
            });
        }
    }
});

function mapDispatchToProps (dispatch) {
    return {
        updateStateUser: (username, name, url) => {
            dispatch (updateUser(username,name, url));
        }
    }
}

const SignupContainer = connect (null, mapDispatchToProps)(SignUp);
export default SignupContainer;
