import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import '../styles/styles.css';


let outerContainer = {
	width: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center"
}

let RoomNavigation = React.createClass({
	render: function() {
		return(
			<div style={outerContainer}>
				<Nav bsClass="roomNavigationTabBar" bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
					<NavItem eventKey={1}>Queue</NavItem>
					<NavItem eventKey={2}>Roommates</NavItem>
				</Nav>
				{this.props.children}
			</div>
		);
	},
	getInitialState: function() {
		return({
			activeKey: 1
		});
	},
	handleSelect: function(eventKey) {
		if (eventKey !== this.state.activeKey) {
			this.setState({
				activeKey: eventKey
			});
			if (eventKey === 1) {
				browserHistory.push('/mobile/rooms/'+this.props.params.roomName);
			} else {
				browserHistory.push('/mobile/rooms/'+this.props.params.roomName+'/roommates');
			}
		}
	}
});

export default RoomNavigation;
