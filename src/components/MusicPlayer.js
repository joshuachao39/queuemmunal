import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import data from '../data/music.json';

let MusicPlayer = React.createClass({
	render() {
		let songTitle;
		let artistName;
		let songURL;
		if (!this.state.songsLeft) {
			songTitle = "No songs left in queue";
		} else {
			songTitle = data[this.state.index].name;
			artistName = " · " + data[this.state.index].artist;
			songURL = data[this.state.index].url;
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
					 // soundcloudConfig={{showArtwork: true}}
					 width={this.props.width}
					 height={0}
					 onProgress={this.onProgress}
					 onStart={this.songStart}
					 onEnded={this.songFinish}
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
			index: 60,
			songsLeft: true,
			played: 0,
			loaded: 0
		}
	},
	songStart() {
		this.player.seekTo(0.95);
	},
	songFinish() {
		console.log(data.length);
		let currentIndex = this.state.index;
		console.log(currentIndex + 1);
		if (currentIndex + 1 >= data.length) {
			this.setState({
				songsLeft: false,
				played: 0.05
			})
		} else {
			this.setState({
				index: currentIndex + 1
			})
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
		currentRoom: state.currentRoom
	}
}

const MusicPlayerContainer = connect(mapStateToProps) (MusicPlayer);
export default MusicPlayerContainer;