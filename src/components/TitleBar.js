import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
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
	left: 15,
	borderStyle: "none",
	backgroundColor: "transparent"

}


let backContent = '<';

let TitleBar = React.createClass({
	render: function() {
		let backButton;
		let titleToShow;
		if (this.props.showBackButton === false) {
			backButton = null
		} else {
			backButton = <button style={buttonStyle} onClick={this.handleBack}> {backContent} </button>;
		}

		if (this.props.currentRoom === undefined) {
			titleToShow = this.props.title.toUpperCase()
		} else {
		 	titleToShow = this.props.currentRoom.toUpperCase()
		}


		return (
			<div style={titleStyle}>
				{backButton}
				{titleToShow}
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

function mapStateToProps (state, ownProps) {
	return {
		height: state.height,
		width: state.width,
		currentRoom: state.currentRoom
	}
}

const TitleBarContainer = connect(mapStateToProps)(TitleBar)
export default TitleBarContainer;
