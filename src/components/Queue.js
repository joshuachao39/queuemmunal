import React from 'react';
import { Glyphicon, Nav, NavItem } from 'react-bootstrap';
import Modal from 'react-modal';
import SongListObject from './SongListObject';
import SongQueryObject from './SongQueryObject';
import ReactList from 'react-list';
import Fuse from 'fuse.js';
import '../styles/styles.css';
import $ from 'jquery';
import {connect} from 'react-redux';
import exit from '../assets/closeIcon.svg';

// firebase realtime db
import {database} from '../database/init';

// songs
import data from '../data/music.json';

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
    paddingBottom: 7
};




let Queue = React.createClass({
	render: function() {
        let songError;

        if (this.state.addSongError) {
            songError = <p style={{fontSize: 15, color: "#FF6D7F", fontFamily: "Quicksand", marginTop: 10}}>You must select a song!</p>
        };

		return(
			<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>

				<div style={{overflow: "auto", maxHeight: "65vh", minHeight: "65vh", width: "90%", background: "#FFF", borderRadius: 15}}>
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
                            <div style={{width: "100%"}}>
                                <p style={addSongHeadingStyle}>Search</p>
                                <input style={formStyle} type="text" value={this.state.searchSongQuery} placeholder="Search by song title or artist" onChange={this.handleSearch} />
                            </div>
                            <div style={{overflow: "auto", minHeight: 400, maxHeight: 400, width: "100%", background: "#FFF", borderRadius: 15}}>
                                <ReactList itemRenderer={this.renderSong} length={this.state.songDatabase.length} type="uniform" />
                            </div>
                            <div style={{width: "100%", display: "flex", flexFlow: "column nowrap", alignItems: "center"}}>
                                <button style={addSongButtonStyle} onClick={this.handleAddSong}>Add Song!</button>
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
            addSongError: false,
            searchSongQuery: "",
            songDatabase: data,
            selectedSong: "",
            songs: []
		});
	},

    componentDidMount: function () {
        var that = this;
        var roomSongListRef = database.ref('rooms/'+ this.props.roomKey + '/songList');
        var songId = -1;
        roomSongListRef.on('child_added', function(data) {
            let currentSongs = that.state.songs;
            currentSongs.push({
                name: data.val().name,
                artist: data.val().artist,
                key: data.key
            });
            that.setState({
                songs: currentSongs
            })
            /*console.log("something changed!");
            console.log (data.val());
            let queueEntryKey = data.val();
            console.log ("queueEntryKey "+queueEntryKey)
            database.ref('queueEntry/' + queueEntryKey).once('value').then(function(snapshot) {
                console.log (snapshot.val())
                let songId = snapshot.val().songId;
                that.addSong (songId);
            }) */
        });
        roomSongListRef.on('child_removed', function(snapshot) {
            let currentSongs = that.state.songs;
            for (let index = currentSongs.length - 1; index >= 0; index--) {
                if (currentSongs[index].key === snapshot.key) {
                    currentSongs.splice(index, 1);
                    break;
                }
            }
            that.setState({
                songs: currentSongs
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
    renderSong(index, key) {
        return (
            <SongQueryObject name={this.state.songDatabase[index].name} artist={this.state.songDatabase[index].artist} url={this.state.songDatabase[index].url} handleSelectCallback={this.selectSong} key={key} />
        );
    },

	renderItem: function(index, key) {
		let currentSong = true;
		if (index !== 0) {
			currentSong = false;
		}
		return <SongListObject currentSong={currentSong} name={this.state.songs[index].name} artist={this.state.songs[index].artist} key={key} username={this.props.username}/>
	},
	handleSearch(event) {
        if (event.target.value != '') {
            var options = {
              shouldSort: true,
              threshold: 0.6,
              location: 0,
              distance: 100,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: [
                "name",
                ]
            };
            var fuse = new Fuse(data, options); // "list" is the item array
            var result = fuse.search(event.target.value + "");
            if (this.state.selectedSong !== "") {
                this.state.selectedSong.setState({
                    selected: false
                })
            }
            this.setState({
                selectedSong: "",
                searchSongQuery: event.target.value,
                songDatabase: result
            });
        } else {
            this.setState({
                selectedSong: "",
                searchSongQuery: event.target.value,
                songDatabase: data
            })
        }
    },
	handleAddSongSelect: function(eventKey) {
		if (this.state.addSongActiveKey !== eventKey) {
            this.setState({
                addSongActiveKey: eventKey
            });
        }
	},
    selectSong: function(song) {
        if (this.state.selectedSong === "") {
            this.setState({
                selectedSong: song
            })
        } else {
            if (this.state.selectedSong === song) {
                this.setState({
                    selectedSong: ""
                })
            } else {
                this.state.selectedSong.setState({
                    selected: false
                });
                this.setState({
                    selectedSong: song
                })
            }
        }
    },

	handleAddSong: function() {
        if (this.state.selectedSong !== "") {
    		this.close();
            let roomSongListRef = database.ref('rooms/'+ this.props.roomKey + '/songList');
            if (this.state.songs.length === 0) {
                roomSongListRef.push({
                    name: this.state.selectedSong.props.name,
                    artist: this.state.selectedSong.props.artist,
                    url: this.state.selectedSong.props.url,
                    startTime: Date.now(),
                    votes: 0
                });
            } else {
                roomSongListRef.push({
                    name: this.state.selectedSong.props.name,
                    artist: this.state.selectedSong.props.artist,
                    url: this.state.selectedSong.props.url,
                    startTime: -1,
                    votes: 0
                });
            }

    		this.setState({
    			selectedSong: ""
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
        roomKey: state.currentRoomKey,
        height: state.height,
        width: state.width,
        username: state.username
    }
}


const QueueContainer = connect (mapStateToProps)(Queue);
export default QueueContainer;
