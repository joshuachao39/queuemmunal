import React from 'react';
import ReactList from 'react-list';
import LibraryListObject from './LibraryListObject';
import {connect} from 'react-redux';
// firebase realtime db
import {database} from '../database/init';


let Library = React.createClass({
	render: function() {
		return (
			<div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>

				<div style={{overflow: "auto", maxHeight: "65vh", minHeight: "65vh", width: "90%", background: "#FFF", borderRadius: 15}}>
                    <ReactList itemRenderer={this.renderItem} length={this.state.songs.length} type="uniform" />
                </div>


				{/*<Modal
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
				</Modal> */}
			</div>
		);
	}, 
	getInitialState: function() {
		return ({
            songs: []
		});
	},
	componentDidMount: function() {
		let savedSongsRef = database.ref('users/' + this.props.username + '/savedSongs');
		let that = this;
		savedSongsRef.on('child_added', function(snapshot) {
			let currentSavedSongs = that.state.songs;
			currentSavedSongs.push({
				name: snapshot.val().name,
				artist: snapshot.val().artist
			})
			that.setState({
				songs: currentSavedSongs
			})
		})
	},
	renderItem: function(index, key) {
		return <LibraryListObject name={this.state.songs[index].name} artist={this.state.songs[index].artist} key={key}/>
	},

});

function mapStateToProps (state, ownProps) {
	return {
		username: state.username
	}
}

const LibraryContainer = connect(mapStateToProps) (Library);
export default LibraryContainer;
