import React from 'react';
import { browserHistory } from 'react-router';
let buttonStyle = {
	background: "#FF6D7F",
	boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
	borderRadius: 100,
	fontFamily: "Quicksand",
	fontSize: 16,
	color: "white",
	width: "75%",
	paddingTop: 10,
	paddingBottom: 10,
	display: "flex",
	justifyContent: "center",
}

export default React.createClass({
	render: function() {
		return (
			<div onClick={this.handleClick} style={buttonStyle} className="animated bounceIn">
				Log Out
			</div>
		);
	},
	handleClick: function() {
		// log out stuff goes here
		browserHistory.push('/');
	}
});