import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import BottomNavBar from './BottomNavBar';
import TitleBar from './TitleBar';
import $ from 'jquery';


let navigationStyle = {
	minHeight: "100%",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	background: "#F4F4F8"
}

let innerContainerStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "100%",
	height: "100%",
	position: "relative"
}


let Navigation = React.createClass({
	render: function() {
		// console.log(this.state.activePage);
		return (
			<div style={navigationStyle}>
				<TitleBar title={this.state.activePage} />
				<div style={innerContainerStyle}>
					{this.props.children}
				</div>
				<BottomNavBar callbackParent={this.tabBarChange} />
			</div>
		);
	},
	tabBarChange: function(newPage) {
		// console.log("switching to " + newPage);
		this.setState({
			activePage: newPage
		});
		if (newPage === 'Rooms') {
			newPage = "";
		}
		this.props.router.push("/mobile/" + newPage);
	},
	getInitialState: function() {
		return({
			activePage: "Rooms"
		});
	}

});

export default Navigation;
