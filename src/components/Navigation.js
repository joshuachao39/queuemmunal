import React from 'react';
import {connect} from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import BottomNavBar from './BottomNavBar';
import TitleBar from './TitleBar';
import MusicPlayer from './MusicPlayer';
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
		console.log("CURRENT ROOM: " + this.props.currentRoom);
		const childrenWithProps = React.Children.map(this.props.children,
     		(child) => React.cloneElement(child, {
       			changeTitleBarCallback: this.changeTitleFromChild
     		})
    	);

    	let musicPlayer;

    	if (this.props.currentRoom != undefined) {
    		musicPlayer = <MusicPlayer/>
    	}


		return (
			<div style={navigationStyle}>
				<TitleBar changeTitleBarCallback={this.changeTitleFromChild} title={this.state.activePage} showBackButton={this.state.showBackButton}/>
				<div style={innerContainerStyle}>
					
					{childrenWithProps}
				</div>
				{musicPlayer}
				
				<BottomNavBar callbackParent={this.tabBarChange} />
			</div>
		);
	},
	changeTitleFromChild: function(titleState) {
		this.setState({
			activePage: titleState.title,
			showBackButton: titleState.showBackButton
		});
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
			activePage: "Rooms",
			showBackButton: false
		});
	}

});

function mapStateToProps (state, ownProps) {
	return {
		height: state.height,
		width: state.width,
		currentRoom: state.currentRoom
	}
}

const NavigationContainer = connect (mapStateToProps)(Navigation);
export default NavigationContainer;
