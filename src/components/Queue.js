import React from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/styles.css';
import $ from 'jquery';

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



let Queue = React.createClass({
	render: function() {
		return(
			<div>
				<p style={{fontFamily: "Quicksand", fontSize: 20, marginBottom: 15}}> This is a queue! </p>
				<div style={buttonStyle} onClick={this.open} className="animated bounceIn">Add a song</div>

				<Modal 
					show={this.state.showAddSongModal}
					onHide={this.close}
					bsSize="large">
					<Modal.Header bsClass="modal-header-style" closeButton/>
					<div style={{display: "flex", 
								 flexDirection: "column", 
								 alignItems: "center", 
								 height: $(window).height() * 0.85, 
								 fontFamily: "Quicksand"}}>
						<p> Let's add a song! </p>
					</div>
				</Modal>
			</div>
		);
	},
	getInitialState: function() {
		return ({
			showAddSongModal: false
		});
	},
	close: function() {
		this.setState({
			showAddSongModal: false
		});
	},
	open: function() {
		this.setState({
			showAddSongModal: true
		});
	}
});

export default Queue;