import React from 'react';

// firebase realtime db
import {database} from '../database/init';


let songStyle = {
	display: "flex",
	justifyContent: "flex-start",
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

let artistStyle = {
	fontSize: 13, 
	color: "#6F6F6F", 
	marginLeft: 5,
	marginBottom: 2
}

let titleAndArtistStyle = {
	display: "inline-block",
	alignSelf: "center",
}


let LibraryListObject = React.createClass({
	render: function() {
		return (
			<div style={songStyle}>
				<div style={titleAndArtistStyle}> 
					<p style={titleStyle}>{this.props.name}</p>
	                <p style={artistStyle}>{this.props.artist}</p>
	            </div>
			</div>
		);
	}
})

export default LibraryListObject;