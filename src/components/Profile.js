import React from 'react';
import { browserHistory } from 'react-router';
import uniqueProfile from '../assets/profile_photo.jpg';
import {connect} from 'react-redux';
import anonymousProfile from '../assets/anonymousProfile.svg';
import $ from 'jquery';
import Switch from 'react-ios-switch';
import 'react-ios-switch/build/bundle.css';


let adjectives = ["Brawny", "Terrific", "Shocking", "Furry", "Fierce", "Somber", "Supreme", "Chill", "Infinite", "Secretive", "Knowlegable",
				  "Accurate", "Humorous", "Smooth", "Quirky", "Quick", "Receptive", "Productive", "Tasteful", "Funny"];

let animals = ["Canary", "Cat", "Jaguar", "Deer", "Toad", "Chimp", "Shrew", "Dragon", "Chameleon", "Pikachu", "Wolverine", "Gazelle", "Meerkat",
               "Jackal", "Lion", "Elk", "Sloth", "Panda", "Fox", "Mantis"];

let buttonStyle = {
	background: "#FF6D7F",
	boxShadow: "0 3px 6px 3px rgba(0,0,0,0.24)",
	borderRadius: 100,
	fontFamily: "Quicksand",
	fontSize: 16,
	color: "white",
	width: "75%",
	paddingTop: 10,
	paddingBottom: 10,
	display: "flex",
	justifyContent: "center",
	marginBottom: 15
}

class Profile extends React.Component {

	constructor (props) {
        super (props)
        this.state = {
			isAnonymous: false,
		}
	}

	render () {
		let profileToBeRendered = anonymousProfile;

		let randomNumber1 = Math.floor(Math.random() * 20);
		let randomNumber2 = Math.floor(Math.random() * 20);

		let name = adjectives[randomNumber1] + animals[randomNumber2];
		if (!this.state.isAnonymous) {
			profileToBeRendered = uniqueProfile;
			name = this.props.name;
		}
		return (
			<div style={{ display: "flex",
						  flexDirection: "column",
						  alignItems: "center",
						  justifyContent: "space-around",
						  height: "100%",
						  width: "100%",
						  position: "absolute"
						}}>
				<img className="animated pulse" style={{borderRadius: "50%"}} src={profileToBeRendered} alt="Profile Photo" width={$(window).width() * 0.6}/>
				<div style={{fontFamily: "Quicksand", fontSize: 36, width: "100%", textAlign: "center"}}>
					{name}
					<div style={{marginTop: 20,
								 height: 50,
								 background: "white",
								 fontSize: 18,
								 display: "flex",
								 justifyContent: "space-between",
								 alignItems: "center"}}>
						<p style={{marginLeft: 25, marginBottom: 0}}>Join rooms anonymously</p>
						<Switch checked={this.state.isAnonymous}
								 onChange={this.toggle}
								 className="switch"/>
					</div>
				</div>
				<div onClick={this.handleClick} style={buttonStyle} className="animated bounceIn">
					Log Out
				</div>
			</div>
		);
	}

	handleClick () {
		// log out stuff goes here
		browserHistory.push('/');
	}


	toggle () {
		this.setState({
			isAnonymous: !this.state.isAnonymous
		});
	}
}

function mapStateToProps (state) {
    return {
        name: state.fullname
    }
}

const ProfileContainer = connect (mapStateToProps)(Profile);

export default ProfileContainer;
