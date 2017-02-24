import React from 'react';
import { Glyphicon, Nav, NavItem } from 'react-bootstrap';
import Modal from 'react-modal';
import SongListObject from './SongListObject';
import '../styles/styles.css';
import $ from 'jquery';
import ReactList from 'react-list';
import {connect} from 'react-redux';
import exit from '../assets/closeIcon.svg';

// firebase realtime db
import {database} from '../database/init';

let buttonStyle = {
    background: "#FF6D7F",
    boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
    borderRadius: "50%",
    fontFamily: "Quicksand",
    fontSize: 36,
    color: "white",
    width: 90,
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "absolute",
    bottom: 15,
    right: 15
}

let addSongModalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)"
    },
    content: {
        borderRadius: 15,
        border: "none",
        background: "#F4F4F8",
        fontFamily: "Quicksand"
    }
}

let containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
}

let exitContainerStyle = {
    width: "100%"
}

let titleStyle = {
    width: "100%",
    height: ($(window).height() / 480) * 25,
    fontFamily: "Quicksand",
    fontSize: 18,
    color: "#3066BE",
    borderBottom: "1px solid #3066BE",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
}

let contentStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-around",
    alignItems: "center"
}

let addSongHeadingStyle = {
    marginTop: 5,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold"
}

let formStyle = {
    /* Field: */
    background: "#FFFFFF",
    border: "0 solid rgba(77,77,77,0.78)",
    /* Text within the field */
    fontFamily: "Quicksand",
    fontSize: 14,
    color: "#C7C7CD",
    letterSpacing: -0.08,
    padding: 10,
    width: "100%"
};

let addSongButtonStyle = {
    /* Button Background: */
    background: "#FF6D7F",
    borderRadius: 80,
    /* Login: */
    fontFamily: "Quicksand",
    fontSize: 18,
    color: "#FFFFFF",
    letterSpacing: 0,
    width: "50vw",
    border: "none",
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 40
};




let Queue = React.createClass({
	render: function() {
        let songError;

        if (this.state.addSongError) {
            songError = <p style={{fontSize: 15, color: "#FF6D7F", fontFamily: "Quicksand", marginTop: 10}}>You must input both a song title and an artist!</p>
        };

		return(
			<div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>

				<div style={{overflow: "auto", maxHeight: "500px", minHeight: "500px", width: "90%", background: "#FFF", borderRadius: 15}}>
                    <ReactList itemRenderer={this.renderItem} length={this.state.songs.length} type="uniform" />
                </div>


				<div style={buttonStyle} onClick={this.open} className="animated bounceIn">
					<Glyphicon style={{fontSize:30}} glyph="plus" />
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
				</Modal>*/}
				<Modal
					isOpen={this.state.showAddSongModal}
					contentLabel="Add Song Modal"
					style={addSongModalStyle}>

					<div style={containerStyle}>
                        <img src={exit} className="exitStyle animated bounceIn" alt="exit" onClick={this.close}/>
                        <div style={exitContainerStyle}>
                            <div style={titleStyle}>
                                ADD A SONG
                            </div>
                            <Nav bsClass="addRoomTabBar" bsStyle="pills" activeKey={this.state.addSongActiveKey} onSelect={this.handleAddSongSelect}>
                                <NavItem eventKey={1}>Search </NavItem>
                                <NavItem eventKey={2}>My Library </NavItem>
                            </Nav>
                        </div>
                        <div style={contentStyle}>
                            <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", justifyContent: "space-around", alignItems: "center"}}>
                                <div style={{width: "100%"}}>
                                    <p style={addSongHeadingStyle}>Song Name</p>
                                    <input style={formStyle} type="text" value={this.state.addNameQuery} placeholder="Enter song name" onChange={this.handleNameQueryChange} />
                                    <p style={addSongHeadingStyle}>Song Artist</p>
                                    <input style={formStyle} type="text" value={this.state.addAristQuery} placeholder="Enter song artist" onChange={this.handleArtistQueryChange} />
                                </div>
                                <button style={addSongButtonStyle} onClick={this.handleAddSong}>Add Song!</button>
                            {/* ADD MORE SHIT HERE LATER! */}
                            {songError}
                            </div>
                        </div>
                    </div>
				</Modal>

			</div>
		);
	},
	getInitialState: function() {
		return ({
			showAddSongModal: false,
			addSongActiveKey: 1,
			addNameQuery: "",
			addArtistQuery: "",
            addSongError: false,
            songs: []
		});
	},

    componentDidMount: function () {
        var that = this;
        var roomSongListRef = database.ref('rooms/'+ this.props.roomKey + '/songList');
        var songId = -1;
        roomSongListRef.on('child_added', function(data) {
            console.log (data.val());
            let queueEntryKey = data.val();
            console.log ("queueEntryKey "+queueEntryKey)
            database.ref('queueEntry/' + queueEntryKey).once('value').then(function(snapshot) {
                console.log (snapshot.val())
                let songId = snapshot.val().songId;
                that.addSong (songId);
            })
        });
    },

    addSong: function (songId) {
        var that = this;
        database.ref('songs/' + songId).once('value').then(function(snapshot) {
            var songArray = that.state.songs;
    		songArray.push({name: snapshot.val().name, artist: snapshot.val().artist});
            that.setState ({
                songs: songArray
            });
        });
    },

	renderItem: function(index, key) {
		let currentSong = true;
		if (index !== 0) {
			currentSong = false;
		}
		return <SongListObject currentSong={currentSong} name={this.state.songs[index].name} artist={this.state.songs[index].artist} key={key} />
	},
	handleNameQueryChange: function(event) {
		this.setState({
			addNameQuery: event.target.value
		});
	},
	handleArtistQueryChange: function(event) {
		this.setState({
			addArtistQuery: event.target.value
		})
	},
	handleAddSongSelect: function(eventKey) {
		if (this.state.addSongActiveKey !== eventKey) {
            this.setState({
                addSongActiveKey: eventKey
            });
        }
	},
	handleAddSong: function() {
        if (this.state.addNameQuery !== '' && this.state.addArtistQuery !== '') {
    		this.close();
    		this.state.songs.push({name: this.state.addNameQuery, artist: this.state.addArtistQuery});
    		this.setState({
    			addNameQuery: "",
    			addArtistQuery: "",
                addSongError: false
    		})
        } else {
            this.setState({
                addSongError: true
            })
        }
	},
	close: function() {
		this.setState({
			showAddSongModal: false,
            addSongError: false
		});
	},
	open: function() {
		this.setState({
			showAddSongModal: true
		});
	}
});


function mapStateToProps (state) {
    return {
        roomKey: state.currentRoomKey
    }
}


const QueueContainer = connect (mapStateToProps)(Queue);
export default QueueContainer;
