import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {updateRoom} from '../redux/actions';
import {database} from '../database/init';
import ReactList from 'react-list';
import IndividualRoommate from './IndividualRoommate';

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
    paddingLeft: 20,
    paddingRight: 20,
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

        let roommatesRef = database.ref ('rooms/'+this.props.currentRoomKey+'/roommates/list');

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
    }


	render () {
		return (
			<div style={{width: "100%", height: "100%", display:"flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>

                <div style={{overflow: "auto", maxHeight: "52vh", minHeight: "52vh", width: "90%", background: "#FFF", borderRadius: 15, marginBottom: 20}}>
                    <ReactList itemRenderer={this.renderItem} length={this.state.roommates.length} type="uniform" />
                </div>

				<div style={buttonStyle} onClick={this.leaveRoom} className="animated bounceIn">Leave this room</div>

			</div>
		);
	};


	leaveRoom() {
        browserHistory.push('/mobile_redesigned');
        var that = this;

        database.ref('rooms/'+this.props.currentRoomKey).once ("value").then(function(snapshot){

            var updates = {};

            let admin = snapshot.val().admin;
            let oldRoommates = snapshot.val().roommates.list;
            let oldIndex = oldRoommates.indexOf(that.props.username);
            let roommateCount = oldRoommates.length;

            if (oldIndex !== -1) {
                oldRoommates.splice (oldIndex, 1);
            }

            database.ref('rooms/'+that.props.currentRoomKey+'/roommates').set({
                list: oldRoommates
            });

            // if last roommate, delete room
            if (roommateCount === 1) {
                console.log ('removing '+ that.props.currentRoomKey)
                database.ref('rooms/').child(that.props.currentRoomKey).remove();
            }

            else {

                // if admin, switch admin
                if (admin === that.props.username) {
                    updates['/rooms/' + that.props.currentRoomKey + '/admin'] = oldRoommates[0];
                    database.ref().update(updates);
                }
            }

        })

        this.props.removeRoom();
    }

	renderItem (index, key){
		return (
            <IndividualRoommate name={this.state.roommates[index]} key={key} />
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
        currentRoomKey: state.currentRoomKey,
        username: state.username,
        fullname: state.fullname,
        width: state.width,
        height: state.height
    });
}

const RoommatesContainer = connect (mapStateToProps, mapDispatchToProps) (Roommates);
export default RoommatesContainer;
