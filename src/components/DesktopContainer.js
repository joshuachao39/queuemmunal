import React from "react";
import logo from '../assets/logo.svg';
import '../components/App.css';


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
	justifyContent: "center",
	alignItems: "center"
}
const titleStyle = {
	fontFamily: "Quicksand",
	fontSize: 30,
	color: "#3066BE",
	margin: "auto 20",
}

var DesktopContainer = React.createClass({
	render: function() {
      		return (
      			<div style={innerContainerStyle}>
	      			<img src={logo} className="App-logo" alt="logo" />
	      			<p style={titleStyle}>Error! Incorrect page size! </p>
	      			<div style={desktopTextStyle}>
	      				Sorry! Please resize to a verticle mobile size!
	      			</div>
	      		</div>
      		);
      	}
});

export default DesktopContainer;
