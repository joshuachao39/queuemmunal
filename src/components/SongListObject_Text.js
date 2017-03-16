import React from 'react';

// firebase realtime db
import {database} from '../database/init';

let songStyle = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
    padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    borderBottom: "1px solid #C7C7C7",
    width: "100%"
}

let currentSongStyle = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    background: "#A0B8E1",
    color: "white",
    width: "100%"
}

let currentVoteStyle = {
	display: "flex", 
	justifyContent: "center",
	alignItems: "center", 
	borderRight: "1px solid white", 
	color: "white",
	fontSize: 20,
	backgroundColor: "#A0B8E1",
	width: 50
}

let voteStyle = {
	display: "flex", 
	justifyContent: "center",
	alignItems: "center", 
	borderRight: "1px solid #3066BE", 
	color: "#C7C7C7",
	fontSize: 20,
	borderBottom: "1px solid #C7C7C7",
	width: 50
}


let titleStyle = {
	fontSize: 16, 
	color: "#070707", 
	marginBottom: 5, 
	marginLeft: 0
}

let currentTitleStyle = {
	fontSize: 16, 
	color: "white", 
	marginBottom: 5, 
	marginLeft: 0
}

let artistStyle = {
	fontSize: 10, 
	color: "#6F6F6F", 
	marginLeft: 0,
	marginBottom: 2
}

let currentArtistStyle = {
	fontSize: 10, 
	color: "white", 
	marginLeft: 0, 
	marginBottom: 2
}

let addStyle = {
	display: "flex",
	color: "#3066BE",
	fontSize: "0.75em",
	height: "100%",
	marginRight: 15,
	border: "1px solid #3066BE",
	borderRadius: 10,
	padding: 8,
	textAlign: "center"
}

let addCurrentStyle = {
	display: "flex",
	color: "white",
	fontSize: "0.75em",
	height: "100%",
	marginRight: 15,
	border: "1px solid white",
	borderRadius: 10,
	padding: 8,
	textAlign: "center"
}

let titleAndArtistStyle = {
	display: "inline-block",
	alignSelf: "center",
	marginLeft: 5,
}


let SongListObject = React.createClass({
	render: function() {
		let trueStyle;
		let trueTitleStyle;
		let trueArtistStyle;
		let trueVoteStyle;
		let addButtonStyle;

		if (this.props.currentSong) {
			trueStyle = currentSongStyle;
			trueTitleStyle = currentTitleStyle;
			trueArtistStyle = currentArtistStyle;
			addButtonStyle = addCurrentStyle;
			trueVoteStyle = currentVoteStyle;

		} else {
			trueStyle = songStyle;
			trueTitleStyle = titleStyle;
			trueArtistStyle = artistStyle;
			addButtonStyle = addStyle;
			trueVoteStyle = voteStyle;
		}

		return (
			<div style={{display: "flex", justifyContent: "flex-start"}}>
				<div style={trueVoteStyle}>
					{this.state.votes}
				</div>
				<div style={trueStyle}>
					
					<div style={titleAndArtistStyle}> 
						<p style={trueTitleStyle}>{this.props.name}</p>
		                <p style={trueArtistStyle}>{this.props.artist}</p>
		            </div>
		            <div style={addButtonStyle} onClick={this.addFunction}>Add Song to<br/>Library</div>
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
		let that = this;
		let userRef = database.ref('users/' + this.props.username + '/savedSongs');
		let voteRef = database.ref('rooms/' + this.props.roomKey + '/songList/' + this.props.songKey + '/votes').on("value", function(snapshot) {
			that.setState({
				votes: snapshot.val()
			})
		});
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
		if (this.state.shouldAdd) {
			this.props.onSaveSuccess();
			let userRef = database.ref('users/' + this.props.username + '/savedSongs');
			userRef.push({
				name: this.props.name,
				artist: this.props.artist,
				url: this.props.url
			});
		} else {
			this.props.onSaveFailure();

		}
	} 
})



export default SongListObject;