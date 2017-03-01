import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import data from '../data/music.json';
import {database} from '../database/init';

let MusicPlayer = React.createClass({
	render() {
		let songTitle;
		let artistName;
		let songURL;
		if (this.state.queue.length === 0) {
			songTitle = "No songs left in queue";
		} else {
			let currentSong = this.state.queue[0];
			songTitle = currentSong.name;
			artistName = " · " + currentSong.artist;
			songURL = currentSong.url;
		}


		return (
			<div style={{
					height: this.props.height / 12,
					width: this.props.width,
					backgroundColor: "#5C5C5C",
					color: "#fff",
					display: "flex",
					flexFlow: "column nowrap",
					justifyContent: "center",
					alignItems: "center",
					fontFamily: "Quicksand",
					fontWeight: 700,
					fontSize: 15,
					position: "relative"
					}}
				onClick={this.returnToRoom}>
				<div style={{backgroundColor: "#FF6D7F", height: this.props.height / 200, position: "absolute", top: 0, left: 0, right: this.props.width - (this.props.width * this.state.played)}} />
				<ReactPlayer url={songURL} 
					ref={(player) => {this.player = player}}
					 playing={this.state.songsLeft}
					 onReady={this.playerInitialize}
					 // soundcloudConfig={{showArtwork: true}}
					 width={this.props.width}
					 height={0}
					 onProgress={this.onProgress}
					 onStart={this.songStart}
					 onEnded={this.songFinish}
					 onDuration={this.getDuration}
				/>
				<p style={{marginBottom: 5}}> {songTitle} {artistName} </p>
				<p style={{marginBottom: 0, color: "#D4D4D4", fontWeight: 400}}> Playing from {this.props.currentRoom} </p>
			</div>
		);
	},
	onProgress: function(state) {
		// console.log(state);
		this.setState({
			played: state.played,
			loaded: state.loaded
		})
	}, 
	getInitialState() {
		return {
			queue: [],
			songsLeft: true,
			played: 0,
			loaded: 0
		}
	},
	playerInitialize: function() {
		let duration = this.player.player.getDuration() * 1000;
		console.log("duration is: " + duration);
		let timeElapsed = Date.now() - this.state.queue[0].startTime;
		// console.log( 1 - (Date.now() / (duration + this.state.queue[0].startTime)) );
		this.player.seekTo(timeElapsed / duration);

	},
	componentWillReceiveProps: function(nextProps) {
		console.log("nextProps is:");
		console.log(nextProps);
		console.log("Current props are:");
		console.log(this.props);
		console.log("new room key:");
		console.log(nextProps.roomKey);
		let that = this;
		let roomSongListRef = database.ref('rooms/' + nextProps.roomKey + '/songList');
		let newQueue = [];
		roomSongListRef.once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				newQueue.push(childSnapshot.val())
			});
		})
		this.setState({
			queue: newQueue
		})
	},
	componentWillMount: function() {
		/* attach a listener to the entire list rather than just the first song?? */
		let that = this;
		let roomSongListRef = database.ref('rooms/' + this.props.roomKey + '/songList');
		roomSongListRef.on("child_added", function(snapshot) {
			let currentSongs = that.state.queue;
			currentSongs.push({
				artist: snapshot.val().artist,
				name: snapshot.val().name,
				startTime: snapshot.val().startTime,
				url: snapshot.val().url,
				key: snapshot.key
			});
			that.setState({
				queue: currentSongs
			})
		})
		roomSongListRef.on("child_removed", function(snapshot) {
			// put the below code in songFinish
			/*let admin = "";
			database.ref('rooms/' + that.props.roomKey).once("value").then(function(snapshot) {
				console.log("the room metadata is:");
				console.log(snapshot.val());
				admin = snapshot.val().admin;
				if (admin === that.props.username) {

				}
			}); */
			let currentSongs = that.state.queue;
			console.log("key of song to delete: " + snapshot.key);
			for (let index=currentSongs.length - 1; index >= 0; index--) {
				console.log("checking song: ");
				console.log(currentSongs[index]);
				if (currentSongs[index].key === snapshot.key) {
					currentSongs.splice(index, 1);
					break;
				}
			}
			that.setState({
				queue: currentSongs
			})
		})
		console.log("WTFFFF");
	},
	songStart() {
		// you can get rid of this??
		console.log("song starting!");
	},
	songFinish() {
		let that = this;
		database.ref('rooms/' + that.props.roomKey).once("value").then(function(snapshot) {
			if (snapshot.val().admin === that.props.username) {
				let songsRemaining = that.state.queue;
				let songToDeleteKey = that.state.queue[0].key;
				console.log(songsRemaining);
				if (songsRemaining.length > 1) {
					let nextSongKey = that.state.queue[1].key;
					database.ref('rooms/' + that.props.roomKey + '/songList/' + nextSongKey).update({startTime: Date.now()});
				}
				database.ref('rooms/' + that.props.roomKey + '/songList/' + songToDeleteKey).remove();
			}
		});
	},
	returnToRoom() {
		browserHistory.push('/mobile/rooms/' + this.props.currentRoom);
	}

});

function mapStateToProps (state, ownProps) {
	return {
		height: state.height,
		width: state.width,
		currentRoom: state.currentRoom,
		roomKey: state.currentRoomKey,
		username: state.username
	}
}

const MusicPlayerContainer = connect(mapStateToProps) (MusicPlayer);
export default MusicPlayerContainer;