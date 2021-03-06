import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {firebaseApp, database} from '../database/init';
import FaCircleUp from 'react-icons/lib/fa/arrow-circle-o-up';
import FaCircleDown from 'react-icons/lib/fa/arrow-circle-o-down';

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

		let upvoteButtonColor;
		let downvoteButtonColor;
		if (this.state.canVote) {
			if (this.state.upvoteStatus == 0) {
				upvoteButtonColor = "white";
				downvoteButtonColor = "white";
			} else if (this.state.upvoteStatus == 1) {
				upvoteButtonColor = "#FF6D7F";
				downvoteButtonColor = "#939393";
			} else {
				upvoteButtonColor = "#939393";
				downvoteButtonColor = "#FF6D7F";
			}
		} else {
			upvoteButtonColor = "#939393";
			downvoteButtonColor = "#939393";
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
				<div style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", width: "100%", height: "100%", alignItems: "center"}}>
					<FaCircleDown style={{marginLeft: 10}} size={50} color={downvoteButtonColor} onClick={this.downvoteButtonPressed}/>
					<div>
						<p style={{marginBottom: 5, maxWidth: "80vw", textAlign: "center"}}> {songTitle} {artistName} </p>
						<p style={{marginBottom: 0, color: "#D4D4D4", fontWeight: 400, textAlign: "center"}}> Playing from {this.props.currentRoom} </p>
					</div>
					<FaCircleUp style={{marginRight: 10}} size={50} color={upvoteButtonColor} onClick={this.upvoteButtonPressed}/>
				</div>
			</div>
		);
	},
	upvoteButtonPressed: function() {
		console.log("song upvoted!");
		if (this.state.canVote && (this.state.upvoteStatus == 0 || this.state.upvoteStatus == -1)) {
			if (this.state.upvoteStatus == 0) {
				let currentSongVoteRef = database.ref('/rooms/' + this.props.roomKey + '/songList/' + this.state.queue[0].key + '/votes');
				currentSongVoteRef.transaction(function (current_value) {
				  return (current_value || 0) + 1;
				});
			} else {
				let currentSongVoteRef = database.ref('/rooms/' + this.props.roomKey + '/songList/' + this.state.queue[0].key + '/votes');
				currentSongVoteRef.transaction(function (current_value) {
				  return (current_value || 0) + 2;
				});
			}
			this.setState({
				upvoteStatus: 1
			})
		}
	},
	downvoteButtonPressed: function() {
		console.log("song downvoted!");
		if (this.state.canVote && (this.state.upvoteStatus == 0 || this.state.upvoteStatus == 1)) {
			if (this.state.upvoteStatus == 0) {
				let currentSongVoteRef = database.ref('/rooms/' + this.props.roomKey + '/songList/' + this.state.queue[0].key + '/votes');
				currentSongVoteRef.transaction(function (current_value) {
				  return (current_value || 0) - 1;
				});
			} else {
				let currentSongVoteRef = database.ref('/rooms/' + this.props.roomKey + '/songList/' + this.state.queue[0].key + '/votes');
				currentSongVoteRef.transaction(function (current_value) {
				  return (current_value || 0) - 2;
				});
			}
			this.setState({
				upvoteStatus: -1
			})
		}
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
			played: 0,
			upvoteStatus: 0,
			canVote: false
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

			database.ref('rooms/' + nextProps.roomKey + '/roommates/list').on("value", function(snapshot) {
	            console.log("Current roommate count is now: " + snapshot.val().length);
	            that.setState({
	                roommateCount: snapshot.val().length
	            })
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
				if (currentSongs.length == 0) {
					that.setState({
						queue: currentSongs,
						canVote: false
					})
				} else {
					that.setState({
						queue: currentSongs
					})
				}
			});

			database.ref('rooms/' + this.props.roomKey + "/admin").on("value", function(snapshot) {
				console.log("admin initialized/changed to " + snapshot.val());
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

		database.ref('rooms/' + this.props.roomKey + '/roommates/list').on("value", function(snapshot) {
            console.log(snapshot.val());
            console.log("Current roommate count is now: " + snapshot.val().length);
            that.setState({
                roommateCount: snapshot.val().length
            })
        })

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
			if (currentSongs.length == 0) {
				that.setState({
					queue: currentSongs,
					canVote: false
				})
			} else {
				that.setState({
					queue: currentSongs
				})
			}
		});

		database.ref('rooms/' + this.props.roomKey + "/admin").on("value", function(snapshot) {
			console.log("admin initialized/changed to " + snapshot.val());
			that.setState({
				admin: snapshot.val()
			})
		})


		//

	},
	songStart() {
		let that = this;
		database.ref('rooms/' + this.props.roomKey + '/songList/' + this.state.queue[0].key + '/votes').on("value", function(snapshot) {
			console.log("The vote listener says that the current vote count is: " + snapshot.val());
			if (snapshot.val() < 0) {
				if (snapshot.val() <= -1 * (that.state.roommateCount / 2)) {
					let songsRemaining = that.state.queue;
					let songToDeleteKey = that.state.queue[0].key;
					if (songsRemaining.length > 1) {
						let nextSongKey = that.state.queue[1].key;
						database.ref('rooms/' + that.props.roomKey + '/songList/' + nextSongKey).update({startTime: firebaseApp.database.ServerValue.TIMESTAMP});
					}
					database.ref('rooms/' + that.props.roomKey + '/songList/' + songToDeleteKey).remove();
				}
			}
		})
		this.setState({
			canVote: true,
			upvoteStatus: 0
		})
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
