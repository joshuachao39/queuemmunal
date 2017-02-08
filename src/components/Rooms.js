import React from 'react';
import '../../node_modules/animate.css';
import Modal from 'react-modal';
import '../styles/animations.css';
import exit from '../assets/closeIcon.svg';
import $ from 'jquery';
import { browserHistory } from 'react-router';

let buttonStyle = {
	background: "#FF6D7F",
	boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
	borderRadius: 100,
	fontFamily: "Quicksand",
	fontSize: 16,
	color: "white",
	width: "75%",
	height: 45,
	paddingTop: 10,
	paddingBottom: 10,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	marginBottom: 15
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
	marginBottom: 20
}


let containerStyle = {
	height: "100%",
	width: "100%",
	display: "flex",
	flexFlow: "column nowrap",
	justifyContent: "center",
	alignItems: "center"

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
	flex: 1,
	height: "100%",
	width: "100%"
}

let exitContainerStyle = {
	height: 24,
	width: "100%"
}


export default React.createClass({
	render: function() {
		return (
			<div style={containerStyle}>
				<div onClick={this.createRoom} style={buttonStyle} className="animated bounceIn">
					Create a Room
				</div>
				<div onClick={this.enterRoom} style={buttonStyle} className="animated bounceIn">
					Enter a Room
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
						</div>
						<div style={contentStyle}></div>
					</div>
				</Modal>
			</div>
		);
	},
	getInitialState: function() {
		return ({
			createModalIsOpen: false
		});
	},
	createRoom: function() {
		this.setState({
			createModalIsOpen: true
		});
	},
	enterRoom: function() {
		browserHistory.push('/mobile/rooms/room1');
	},
	closeModal: function() {
		this.setState({
			createModalIsOpen: false
		})
	}
});