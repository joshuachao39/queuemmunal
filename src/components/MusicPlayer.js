import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {firebaseApp, database} from '../database/init';

let MusicPlayer = React.createClass({
	render() {
		let songTitle;
		let artistName;
		let songURL;
		let currentSong;
		if (this.state.queue.length === 0) {
			songTitle = "No songs left in queue";
		} else {
			currentSong = this.state.queue[0];
			songTitle = currentSong.name;
			artistName = " · " + currentSong.artist;
			songURL = currentSong.url;
			//console.log("The song url is: " + currentSong.url);
		}

		// if we lose played???
		let played;
		if (!this.state.played) {
			played = 0;
		} else {
			played = this.state.played;
		}
		if (this.state.queue.length === 0) {
			played = 0.05;
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
				<div style={{backgroundColor: "#FF6D7F", height: this.props.height / 200, position: "absolute", top: 0, left: 0, right: this.props.width - (this.props.width * played)}} />
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

	// On progress is called everytime we come back to the page
	onProgress: function(state) {
		let that = this;
		if (!this.state.played) {

			//The player reset, and for some strange reason, we lose played
			database.ref("/.info/serverTimeOffset").once("value", function(offset) {
				let startTime = that.state.queue[0].startTime || 0;
				let duration = that.player.player.getDuration() * 1000;
				let offsetVal = offset.val() || 0;
				let serverTime = Date.now() + offsetVal;
				let timeElapsed = serverTime - startTime;
				that.setState({
					played: timeElapsed / duration
				})
			})
		} else {
			this.setState({
				played: state.played
			})
		}
	},
	getInitialState() {
		return {
			queue: [],
			songsLeft: true,
			played: 0
		}
	},
	playerInitialize: function() {
		// player initialize is called everytime we come back to the page
		let that = this;
		let duration = this.player.player.getDuration() * 1000;

		let startTime = this.state.queue[0].startTime || 0;
		database.ref("/.info/serverTimeOffset").once("value", function(offset) {
			let offsetVal = offset.val() || 0;
			let serverTime = Date.now() + offsetVal;
			let timeElapsed = serverTime - startTime;

			// check if the song ain't too old
			that.player.seekTo(timeElapsed / duration);
			// set the played
			that.setState({
				played: timeElapsed / duration
			})
		});

	},
	componentWillReceiveProps: function(nextProps) {
		if (this.props.roomKey !== nextProps.roomKey) {
			let that = this;
			let roomSongListRef = database.ref('rooms/' + nextProps.roomKey + '/songList');
			// we changed to a new room. so first, nuke everything in the current queue
			let newSongQueue = [];
			this.setState({
				queue: newSongQueue
			})
			roomSongListRef.on("child_added", function(snapshot) {
				//adding a song in the music player!
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
			});
			roomSongListRef.on("child_removed", function(snapshot) {
				//removing a song in the music player!");
				let currentSongs = that.state.queue;
				for (let index=currentSongs.length - 1; index >= 0; index--) {
					if (currentSongs[index].key === snapshot.key) {
						currentSongs.splice(index, 1);
						break;
					}
				}
				that.setState({
					queue: currentSongs
				})
			});

			database.ref('rooms/' + this.props.roomKey + "/admin").once("value", function(snapshot) {
				console.log("admin initialized to " + snapshot.val())
				that.setState({
					admin: snapshot.val()
				})
			})

			database.ref('rooms/' + this.props.roomKey + "/admin").on("child_changed", function(snapshot) {
				console.log("admin changed to " + snapshot.val())
				that.setState({
					admin: snapshot.val()
				})
			})

		}
	},
	componentDidMount: function() {
		//Is this being run everytime we come back to the room
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
			let currentSongs = that.state.queue;

			for (let index=currentSongs.length - 1; index >= 0; index--) {
				if (currentSongs[index].key === snapshot.key) {
					currentSongs.splice(index, 1);
					break;
				}
			}
			that.setState({
				queue: currentSongs
			})
		});

		database.ref('rooms/' + this.props.roomKey + "/admin").once("value", function(snapshot) {
			console.log("admin initialized to " + snapshot.val());
			that.setState({
				admin: snapshot.val()
			})
		})

		database.ref('rooms/' + this.props.roomKey + "/admin").on("child_changed", function(snapshot) {
			console.log("admin changed to " + snapshot.val());
			that.setState({
				admin: snapshot.val()
			})
		})


		//

	},
	songStart() {
		// you can get rid of this??
	},
	songFinish() {
		let that = this;
		if (this.props.username === this.state.admin) {
			let songsRemaining = that.state.queue;
			let songToDeleteKey = that.state.queue[0].key;
			if (songsRemaining.length > 1) {
				let nextSongKey = that.state.queue[1].key;
				database.ref('rooms/' + that.props.roomKey + '/songList/' + nextSongKey).update({startTime: firebaseApp.database.ServerValue.TIMESTAMP});
			}
			database.ref('rooms/' + that.props.roomKey + '/songList/' + songToDeleteKey).remove();
		}
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
