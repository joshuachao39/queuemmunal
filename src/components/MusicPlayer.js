import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

let MusicPlayer = React.createClass({
	render() {
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
			}}>
				<div style={{backgroundColor: "#FF6D7F", height: this.props.height / 200, position: "absolute", top: 0, left: 0, right: this.props.width - (this.props.width * this.state.played)}} />
				<ReactPlayer url='https://www.youtube.com/watch?v=PT2_F-1esPk' 
					 playing 
					 // soundcloudConfig={{showArtwork: true}}
					 width={this.props.width}
					 height={0}
					 onProgress={this.onProgress}
				/>
				<p style={{marginBottom: 5}}> Closer · The Chainsmokers </p>
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
			played: 0,
			loaded: 0
		}
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