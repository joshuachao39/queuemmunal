import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import BottomNavBar from './BottomNavBar';


let navigationStyle = {
	minHeight: "100%",
	width: "100%",
	display: "flex",
	flexDirection: "column"
}

let innerContainerStyle = {
	flex: 1
}
/*
	<ButtonGroup justified>
		<ButtonGroup>
			<Button>Profile</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button>Rooms</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button>My Library</Button>
		</ButtonGroup>
	</ButtonGroup>
*/

let Navigation = React.createClass({
	render: function() {
		return (
			<div style={navigationStyle}>
				<div style={innerContainerStyle}>
				</div>
				<BottomNavBar />
			</div>
		);
	}
});

export default Navigation;