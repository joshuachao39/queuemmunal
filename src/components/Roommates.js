import React from 'react';
import { browserHistory } from 'react-router';

let buttonStyle = {
	background: "#FF6D7F",
	boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
	borderRadius: 100,
	fontFamily: "Quicksand",
	fontSize: 16,
	color: "white",
	height: 45,
	paddingTop: 10,
	paddingBottom: 10,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}

let Roommates = React.createClass({
	render: function() {
		return (
			<div>
				<p style={{fontFamily: "Quicksand", fontSize: 20, marginBottom: 15}}>These are your roommates!</p>
				<div style={buttonStyle} onClick={this.leaveRoom} className="animated bounceIn">Leave this room</div>
			</div>
		);
	}, 
	leaveRoom: function() {
		browserHistory.push('/mobile');
	}
});

export default Roommates;