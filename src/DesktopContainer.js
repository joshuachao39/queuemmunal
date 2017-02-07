import React from "react";
import logo from './logo.svg';
import './App.css';


const desktopTextStyle = {
	border: "1px solid #FFAAAA",
	borderRadius: 5,
	backgroundColor: "#FFAAAA",
	color: "black",
	fontFamily: "Quicksand, sans-serif",
	padding: "2%",
	maxWidth: "40vw"
}

const innerContainerStyle = {
	display: "flex",
	flexFlow: "column nowrap",
	textAlign: "center"
}

var DesktopContainer = React.createClass({
	render: function() {
      		return (
      			<div style={innerContainerStyle}>
	      			<img src={logo} className="App-logo" alt="logo" />
	      			<div style={desktopTextStyle}>
	      				Sorry! Please resize to a verticle mobile size!
	      			</div>
	      		</div>
      		);
      	}
});

export default DesktopContainer;