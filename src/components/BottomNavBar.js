import React from 'react';
import $ from 'jquery';

let buttonStyle = {
	height: 158,
	background: "#3066BE",
	color: "white",
	fontFamily: "Quicksand",
	fontSize: "14sp",
	display: "flex",
	flexFlow: "row nowrap",
	alignItems: "center",
	justifyContent: "center",
	flex: 1
}

let barStyle = {
	height: 158,
	display: "flex",
	flexFlow: "row nowrap",
	background: "#3066BE"
}

let Button = React.createClass({
	render: function() {
		return(
			<div style={buttonStyle}>
				{this.props.name}
			</div>
		);
	}
});

let BottomNavBar = React.createClass({
	render: function() {
		return(
			<div style={barStyle}>
				<Button name="Profile" />
				<Button name="Rooms" />
				<Button name="My Library" />
			</div>
		);
	}
});

export default BottomNavBar;