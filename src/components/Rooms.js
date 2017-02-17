import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';
import {ListGroup, FormControl, ControlLabel, FormGroup, Glyphicon, Nav, NavItem} from 'react-bootstrap'
import { browserHistory } from 'react-router';
import ReactList from 'react-list';

import RoomListObject from './RoomListObject'
import exit from '../assets/closeIcon.svg';
import '../styles/styles.css';
import '../../node_modules/animate.css';


/* the lower right hand button must be set to position absolute, not fixed, in order to work */
let buttonStyle = {
    background: "#FF6D7F",
    boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
    borderRadius: "50%",
    fontFamily: "Quicksand",
    fontSize: 16,
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


let containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",

}

let createRoomModalStyle = {
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

let contentStyle = {
    flex: 1,
    height: "100%",
    width: "100%"
}

let exitContainerStyle = {
    height: 24,
    width: "100%"
}

let listStyle = {
    width: "90%",
    /*justifyContent: "center",
    alignContent: "center",
    margin: 0,
    overflowY: "scroll" */
}

let searchStyle = {
	/* Field: */
	background: "#FFFFFF",
	border: "0 solid rgba(77,77,77,0.78)",
	fontFamily: "Quicksand",
	fontSize: 14,
	color: "#C7C7CD",
	letterSpacing: -0.08,
	padding: 10,
	width: "90vw",
	marginBottom: 20,
	borderRadius: 15
};

let rooms = [
    {name: "HYPEROOM", count: 205},
    {name:"Slow Jazz", count: 59},
    {name: "Kpop Party", count: 23},
    {name: "Glitch Mob", count:15},
    {name: "ALL CAPS", count: 9},
    {name: "Room 5", count: 5},
    {name: "Room 6", count: 6},
    {name: "Room 7", count: 7},
    {name: "Room 8", count: 8}]


/*
function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup style={searchStyle} controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
} */



export default React.createClass({

    render: function() {
        let roomComponents = [];
        rooms.map ((element, index) => {
            roomComponents.push(<RoomListObject name={element.name} count={element.count} key={index}/>);
        })
        return (
            <div style={containerStyle}>

                <input style={searchStyle} type="text" placeholder="Search for room ID or keyword..." />

                <div style={{overflow: "auto", maxHeight: "500", minHeight: "500", width: "90%", background: "#FFF", borderRadius: 15}}>
                    <ReactList itemRenderer={this.renderItem} length={rooms.length} type="uniform" />
                </div>

                {/* <Infinite containerHeight={500} elementHeight={50} className="listStyle">
                    { roomComponents }
                </Infinite> */}

                <div onClick={this.createRoom} style={buttonStyle} className="animated bounceIn">
                    <Glyphicon style={{fontSize: 30}} glyph="plus" />
                </div>

                <Modal
                    isOpen={this.state.createModalIsOpen}
                    contentLabel="Create Room Modal"
                    style={createRoomModalStyle}>
                    <div style={containerStyle}>
                        <img src={exit} className="exitStyle animated bounceIn" alt="exit" onClick={this.closeModal}/>
                        <div style={exitContainerStyle}>
                            <div style={titleStyle}>
                                CREATE A ROOM
                            </div>
                            <Nav bsClass="addRoomTabBar" bsStyle="pills" activeKey={this.state.createRoomActiveKey} onSelect={this.handleCreateRoomSelect}>
                                <NavItem eventKey={1}>Private </NavItem>
                                <NavItem eventKey={2}>Public </NavItem>
                            </Nav>
                            <div>
                                SUPP
                            </div>
                        </div>
                        <div style={contentStyle}></div>
                    </div>
                </Modal>
            </div>
        );
    },
    getInitialState: function() {
        return ({
            createModalIsOpen: false,
            createRoomActiveKey: 1
        });
    },
    renderItem(index, key) {
        return <RoomListObject name={rooms[index].name} count={rooms[index].count} key={key} />
    },
    handleCreateRoomSelect: function(eventKey) {
        if (this.state.createRoomActiveKey != eventKey) {
            this.setState({
                createRoomActiveKey: eventKey
            });
        }
    },
    createRoom: function() {
        this.setState({
            createModalIsOpen: true
        });
    },
    closeModal: function() {
        this.setState({
            createModalIsOpen: false
        })
    }
});
