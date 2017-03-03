import React from 'react';

// firebase realtime db
import {database} from '../database/init';


let songStyle = {
	display: "flex",
	justifyContent: "flex-start",
    padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    borderBottom: "1px solid #C7C7C7"
}

let currentSongStyle = {
	display: "flex",
	justifyContent: "flex-start",
	padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    background: "#A0B8E1",
    color: "white"
}

let titleStyle = {
	fontSize: 20, 
	color: "#070707", 
	marginBottom: 5, 
	marginLeft: 5
}

let currentTitleStyle = {
	fontSize: 20, 
	color: "white", 
	marginBottom: 5, 
	marginLeft: 5
}

let artistStyle = {
	fontSize: 13, 
	color: "#6F6F6F", 
	marginLeft: 5,
	marginBottom: 2
}

let currentArtistStyle = {
	fontSize: 13, 
	color: "white", 
	marginLeft: 5, 
	marginBottom: 2
}

let addStyle = {
	display: "flex",
	fontSize: "2.5em",
	marginLeft: 5,
	padding: 0,
	border: 0
}

let titleAndArtistStyle = {
	display: "inline-block",
	alignSelf: "center",
	marginLeft: 10,
}


let SongListObject = React.createClass({
	render: function() {
		let trueStyle;
		let trueTitleStyle;
		let trueArtistStyle;

		if (this.props.currentSong) {
			trueStyle = currentSongStyle;
			trueTitleStyle = currentTitleStyle;
			trueArtistStyle = currentArtistStyle;

		} else {
			trueStyle = songStyle;
			trueTitleStyle = titleStyle;
			trueArtistStyle = artistStyle;
		}

		return (
			<div style={trueStyle}>

				<div style={addStyle} onClick={this.addFunction}>+</div>

				<div style={titleAndArtistStyle}> 
					<p style={trueTitleStyle}>{this.props.name}</p>
	                <p style={trueArtistStyle}>{this.props.artist}</p>
	            </div>
			</div>
		);
	},
	getInitialState: function() {
		return ({
			shouldAdd: true
		});
	},
	componentWillMount: function() {
		let userRef = database.ref('users/' + this.props.username + '/savedSongs');
		let that = this;
		userRef.on("child_added", function(snapshot) {
			if (snapshot.val().name === that.props.name && snapshot.val().artist === that.props.artist) {
				that.setState({
					shouldAdd: false
				})
			}
		})
		userRef.on("child_removed", function(snapshot) {
			if (snapshot.val().name === that.props.name && snapshot.val().artist === that.props.artist) {
				that.setState({
					shouldAdd: true
				})
			}
		})
	},
	addFunction: function() {
		console.log('adding a song to saved songs!');
		if (this.state.shouldAdd) {
			this.props.onSaveSuccess();
			let userRef = database.ref('users/' + this.props.username + '/savedSongs');
			userRef.push({
				name: this.props.name,
				artist: this.props.artist
			});
		} else {
			this.props.onSaveFailure();

		}
	} 
})



export default SongListObject;