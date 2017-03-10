import React from 'react';
import $ from 'jquery';

let inactiveButtonStyle = {
	height: ($(window).height() / 480) * 50,
	background: "#97b2de",
	color: "white",
	fontFamily: "Quicksand",
	fontSize: 14,
	display: "flex",
	flexFlow: "row nowrap",
	alignItems: "center",
	justifyContent: "center",
	flex: 1,
	border: "none",
	outline: "none"
}

let activeButtonStyle = {
	height: ($(window).height() / 480) * 50,
	background: "#3066BE",
	color: "white",
	fontFamily: "Quicksand",
	fontSize: 18,
	display: "flex",
	flexFlow: "row nowrap",
	alignItems: "center",
	justifyContent: "center",
	flex: 1,
	border: "none",
	outline: "none"
};

let barStyle = {
	height: ($(window).height() / 480) * 50,
	display: "flex",
	flexFlow: "row nowrap",
	background: "#3066BE",
	width: "100%"
}



let Button = React.createClass({
	render: function() {
		if (!this.props.active) {
			return(
				<div onClick={this.handleClick} style={inactiveButtonStyle}>
					{this.props.name}
				</div>
			);
		} else {
			return (
				<div onClick={this.handleClick} style={activeButtonStyle}>
					{this.props.name}
				</div>
			);
		}
	},
	handleClick: function() {
		// console.log("button was clicked!");
		this.props.callbackParent({
			name: this.props.name,
			position: this.props.position
		});
	}
});

let BottomNavBar = React.createClass({
	render: function() {
		return (
			<div style={barStyle}>
				{
					this.state.buttons.map(function(value, i) {
						return (
							<Button key={i} position={i} name={value.name} active={value.active} callbackParent={this.onChildChanged} />
						);
					}, this)
				}
			</div>
		);
	},
	getInitialState: function() {
		return({
			activePage: "Rooms",
			buttons: [
				{name: "Profile", active: false},
				{name: "Rooms", active: true},
				{name: "My Library", active: false}
			]
		});
	},
	onChildChanged: function(state) {
		// console.log("I know that a buttonw was clicked!");
		// console.log(state.active + " " + state.name + " " + state.position);


		//console.log(this.props.children);
		if (state.name !== this.state.activePage) {
			var newState = {
				activePage: "Rooms",
				buttons: [
					{name: "Profile", active: false},
					{name: "Rooms", active: false},
					{name: "My Library", active: false}
				]
			};
			newState.activePage = state.name;
			newState.buttons[state.position] = {name: state.name, active: true};
			this.setState(newState);
			this.props.callbackParent(newState.activePage);
		}
	}
});

export default BottomNavBar;
