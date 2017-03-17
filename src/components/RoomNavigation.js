import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import '../styles/styles.css';
import exit from '../assets/closeIcon.svg';
import $ from 'jquery';


let outerContainer = {
	width: "100%",
	height: "100%",
	position: "absolute",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center"
}

let contentStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-around",
    alignItems: "center"
}

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
    marginBottom: 10
}

let containerStyle = {
    width: "100%",
    // maybe add height 100% here for modal
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
}

let exitContainerStyle = {
    width: "100%"
}

let modalStyle = {
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

let RoomNavigation = React.createClass({
	render: function() {
		let keyDiv;
		let key = this.props.roomKey;
		if (key) { 
			if (this.props.roomKey.length > 6) {
				keyDiv = <p style={{fontSize: 20, fontFamily: "Courier New", marginBottom: 0, textAlign: "center", color: "red"}}> This is a public room, so it doesn't have a password! </p>
			} else {
				keyDiv = <p style={{fontSize: 50, fontFamily: "Courier New", marginBottom: 0, textAlign: "center"}}> {this.props.roomKey} </p>
			}
		}
		return(
			<div style={outerContainer}>
				<Nav bsClass="roomNavigationTabBar" bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
					<NavItem eventKey={1}>Queue</NavItem>
					<NavItem eventKey={2}>Roommates</NavItem>
				</Nav>
				<div style={{
						paddingTop: 10,
						paddingBottom: 10,
						paddingLeft: 20,
						paddingRight: 20,
						background: "#FF6D7F",
	    				borderRadius: 80,
	    				fontFamily: "Quicksand",
	    				color: "white"
					}}
					onClick={this.openModal}
				>
					View room password
				</div>
				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Room Password Modal"
					shouldCloseOnOverlayClick={true}
					onRequestClose={this.closeModal}
                    style={modalStyle}>
                    {/*<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
					<p style={{fontFamily: "Quicksand", fontSize: 20, color: "#3066BE"}}> ROOM PASSWORD </p>
					</div>*/}
					<div style={containerStyle}>
                        <img src={exit} className="exitStyle animated bounceIn" alt="exit" onClick={this.closeModal}/>
                        <div style={exitContainerStyle}>
                            <div style={titleStyle}>
                                ROOM PASSWORD
                            </div>
                        </div>
                        <div style={contentStyle}>
                            <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", justifyContent: "space-around", alignItems: "center"}}>
            					<div style={{display: "flex", 
				                             justifyContent: "center", 
				                             alignItems: "center", 
				                             flexDirection: "column",
				                             marginTop: 5,
				                             border: "1px solid black",
				                             borderRadius: 15,
				                             padding: 15
				                }}>
				                    <p style={{fontSize: 16, marginBottom: 0}}> Your private password is: </p>
				                    {keyDiv}
				                    <p style={{textAlign: "center", width: this.props.width * 0.6}}> Share this <strong>case-sensitive</strong> code to your friends! You can view this code anytime in your room. </p>
				                </div>;
                            </div>
                        </div>
                    </div>
				</Modal>
				{this.props.children}
			</div>
		);
	},
	getInitialState: function() {
		return({
			activeKey: 1,
			isOpen: false
		});
	},
	openModal: function() {
		this.setState({
			isOpen: true
		})
	},
	closeModal: function() {
		this.setState({
			isOpen: false
		})
	},
	handleSelect: function(eventKey) {
		if (eventKey !== this.state.activeKey) {
			this.setState({
				activeKey: eventKey
			});
			if (eventKey === 1) {
				browserHistory.push('/mobile/rooms/'+this.props.params.roomName);
			} else {
				browserHistory.push('/mobile/rooms/'+this.props.params.roomName+'/roommates');
			}
		}
	}
});

function mapStateToProps (state, ownProps) {
    return {
        roomKey: state.currentRoomKey
    }
}

const RoomNavigationContainer = connect(mapStateToProps, null) (RoomNavigation);

export default RoomNavigationContainer;
