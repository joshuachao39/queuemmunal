import React from 'react';
import {connect} from 'react-redux';
import {database} from '../database/init';


let IndividualRoommate = React.createClass({
	render: function() {
		return(
			<div style={{display: "inline-flex",
			             flexDirection: "column",
			             alignItems: "center",
			             justifyContent: "center",
			             width: (this.props.width * 0.9) / 4,
			         	 paddingTop: 10}}>
            	<img className="animated pulse"
            	     style={{borderRadius: "50%",
            	             textAlign: "center"}}
            	     src={this.state.url}
            	     alt="Presentation"
            	     width="80%"
            	/>
            	<p style={{textAlign: "center", fontFamily: "Quicksand", marginTop: 10, width: (this.props.width * 0.9) / 4 - 5, wordWrap: "break-word"}}>{this.props.name}</p>
        	</div>
        );
	},
	getInitialState: function() {
		return ({
			url: null
		});
	},
	componentWillMount: function() {
		let that = this;
		database.ref('users/' + that.props.name + '/pictureUrl').once("value", function(snapshot) {
			that.setState({
				url: snapshot.val()
			})
		});
	}
});

function mapStateToProps (state, ownProps) {
    return ({
        width: state.width,
        height: state.height
    });
}

const IndividualRoommateContainer = connect (mapStateToProps, null) (IndividualRoommate);
export default IndividualRoommateContainer;
