import React from 'react';


let songStyle = {
    padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    borderBottom: "1px solid #C7C7C7"
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
	marginLeft: 5
}

let currentArtistStyle = {
	fontSize: 13, 
	color: "white", 
	marginBottom: 5, 
	marginLeft: 5
}

let currentSongStyle = {
	padding: "10px",
    margin: "auto",
    fontFamily: "Quicksand",
    background: "#A0B8E1",
    color: "white"
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
				<p style={trueTitleStyle}>{this.props.name}</p>
                <p style={trueArtistStyle}>{this.props.artist}</p>
			</div>
		);
	}
})

export default SongListObject;