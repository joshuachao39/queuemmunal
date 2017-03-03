import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {updateRoom} from '../redux/actions'
import {database} from '../database/init';
import ReactList from 'react-list';

let buttonStyle = {
	background: "#FF6D7F",
	boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
	borderRadius: 100,
	fontFamily: "Quicksand",
	fontSize: 16,
	color: "white",
	height: 45,
	paddingTop: 10,
	paddingBottom: 10,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}

class Roommates extends React.Component {

    constructor (props) {
        super (props);
        this.leaveRoom = this.leaveRoom.bind (this);
        this.renderItem = this.renderItem.bind(this);

        this.state = {
            roommates: []
        }

        var that = this;

        let roommatesRef = database.ref ('rooms/'+this.props.currentRoomKey+'/roommates');

        roommatesRef.on('child_added', function(data) {
            let currentRoommates = that.state.roommates;
            currentRoommates.push (data.val());
            console.log (data.val());
            that.state = {roommates: currentRoommates};
        });

        roommatesRef.on('child_removed', function(data) {
            let currentRoommates = that.state.roommates;
            let index = currentRoommates.indexOf(data.val());

            if (index > -1) {
                currentRoommates.splice (index);
            }

            that.state = {roommates: currentRoommates};
        });
        console.log (this.state.roommates.length);
    }


	render () {
        console.log (this.state.roommates);
		return (
			<div style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>

				<p style={{fontFamily: "Quicksand", fontSize: 20, marginBottom: 15}}>These are your roommates!</p>
                <div style={{overflow: "auto", maxHeight: "65vh", minHeight: "65vh", width: "90%", background: "#FFF", borderRadius: 15}}>
                    <ReactList itemRenderer={this.renderItem} length={this.state.roommates.length} type="uniform" />
                </div>

				<div style={buttonStyle} onClick={this.leaveRoom} className="animated bounceIn">Leave this room</div>

			</div>
		);
	};


	leaveRoom() {
		browserHistory.push('/mobile');
        this.props.removeRoom();
	}

	renderItem (index, key){
		return (
            <div>
                <p style={{fontSize: 20, color: "#070707", marginBottom: 5, marginLeft: 5}} key={key}>{this.state.roommates[index]}</p>
            </div>
        );
	}
}


function mapDispatchToProps (dispatch) {
    return {
        removeRoom: () => {
            dispatch (updateRoom (undefined));
        }
    }
}

function mapStateToProps (state, ownProps) {
    return ({
        currentRoom: state.currentRoom,
        currentRoomKey: state.currentRoomKey,
        username: state.username,
        fullname: state.fullname
    });
}

const RoommatesContainer = connect (mapStateToProps, mapDispatchToProps) (Roommates);
export default RoommatesContainer;
