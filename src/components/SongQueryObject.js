import React from 'react';

let unselectedStyle = {
	padding: "5px",
    margin: "auto",
    fontFamily: "Quicksand",
    borderBottom: "1px solid #C7C7C7",
    color: "#070707"
}

let selectedStyle = {
	padding: "5px",
    margin: "auto",
    fontFamily: "Quicksand",
    borderBottom: "1px solid #3066BE",
    color: "#FFFFFF",
    backgroundColor: "#3066BE"
}

let SongQueryObject = React.createClass({
	render: function() {
		let styleToDisplay;
		if (this.state.selected) {
			styleToDisplay = selectedStyle;
		} else {
			styleToDisplay = unselectedStyle;
		}
		return (
			<div style={styleToDisplay} onClick={this.select}>
                <p style={{fontSize: 17, marginBottom: 3, marginLeft: 5}}>{this.props.name}</p>
                <p style={{fontSize: 13, marginBottom: 3, marginLeft: 5}}>{this.props.artist}</p>
            </div>
		);
	},
	getInitialState: function() {
		return ({
			selected: false
		});
	},
	select: function() {
		this.props.handleSelectCallback(this);
		this.setState({
			selected: !this.state.selected
		})
	}
});

export default SongQueryObject;