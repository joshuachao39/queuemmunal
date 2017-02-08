import React from 'react';
import $ from 'jquery';

let titleStyle = {
	width: ($(window).width() / 320) * 289,
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

let TitleBar = React.createClass({
	render: function() {
		return (
			<div style={titleStyle}>
				{this.props.title.toUpperCase()}
			</div>
		);
	},
});

export default TitleBar;