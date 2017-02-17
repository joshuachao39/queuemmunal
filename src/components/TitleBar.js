import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

let titleStyle = {
	width: ($(window).width() / 320) * 289,
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

let buttonStyle = {
	position: "absolute",
	left: 15

}


let backContent = '<';

let TitleBar = React.createClass({
	render: function() {
		let backButton;
		if (this.props.showBackButton == false) {
			backButton = null
		} else {
			backButton = <button style={buttonStyle} onClick={this.handleBack}> {backContent} </button>;
		}
		return (
			<div style={titleStyle}>
				{backButton}
				{this.props.title.toUpperCase()}
			</div>
		);
	},
	handleBack: function() {
		let titleState = {
			title: "Rooms",
			showBackButton: false
		}
		this.props.changeTitleBarCallback(titleState);
		browserHistory.push('/mobile');
	}
});

export default TitleBar;