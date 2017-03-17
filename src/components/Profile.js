import React from 'react';
import { browserHistory } from 'react-router';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import anonymousProfile from '../assets/anonymousProfile.svg';
import Switch from 'react-ios-switch';
import 'react-ios-switch/build/bundle.css';
import { updateAnonymous } from '../redux/actions';
import exit from '../assets/closeIcon.svg';
import {storageRef} from '../database/init';

let adjectives = ["Brawny", "Terrific", "Shocking", "Furry", "Fierce", "Somber", "Supreme", "Chill", "Infinite", "Secretive", "Knowlegable",
				  "Accurate", "Humorous", "Smooth", "Quirky", "Quick", "Receptive", "Productive", "Tasteful", "Funny", "Gloomy"];

let animals = ["Canary", "Cat", "Jaguar", "Deer", "Toad", "Chimp", "Shrew", "Dragon", "Chameleon", "Pikachu", "Wolverine", "Gazelle", "Meerkat",
               "Jackal", "Lion", "Elk", "Sloth", "Panda", "Fox", "Mantis", "Quail"];

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
			isAnonymous: this.props.isAnonymous,
            showUploadModal: false
		}
		this.toggle = this.toggle.bind(this);
        this.showUploadModal = this.showUploadModal.bind (this);
        this.close = this.close.bind (this);
        this.handleFileUpload = this.handleFileUpload.bind (this);
        this.getInputRef = this.getInputRef.bind(this);
	}

    showUploadModal () {
        this.setState ({
            showUploadModal: true
        })
    }

	render () {

		let randomNumber1 = Math.floor(Math.random() * 21);
		let randomNumber2 = Math.floor(Math.random() * 21);

		let name = adjectives[randomNumber1] + animals[randomNumber2];
		let url = anonymousProfile;

		if (!this.state.isAnonymous) {
			name = this.props.name;
			url = this.props.url;
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
				<img onClick={this.showUploadModal} className="animated pulse" style={{borderRadius: "50%"}} src={url} role="presentation" width={this.props.width * 0.8} height={this.props.width * 0.8}/>

                <Modal
					isOpen={this.state.showUploadModal}
					contentLabel="Add Song Modal">
                        <img src={exit} className="exitStyle animated bounceIn" alt="exit" onClick={this.close}/>
                    Upload Photo
                    <input type="file" ref={this.getInputRef} onChange={this.handleFileUpload}/>
                </Modal>


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

    getInputRef (ref) {
        this.setState ({
            inputRef: ref
        });
    }

    handleFileUpload (e) {
        let file =  this.state.inputRef.files[0];

        storageRef.child(this.props.name + 'DisplayPic.png').put(file).then(function(snapshot) {
            console.log (snapshot)
        });
    }

	handleClick () {
		// log out stuff goes here
		browserHistory.push('/');
	}


    close () {
        this.setState ({
            showUploadModal: false
        });
    }

	toggle () {
		this.setState({
			isAnonymous: !this.state.isAnonymous
		});
	}
}

function mapStateToProps (state) {
    return {
        name: state.fullname,
        url: state.pictureUrl,
        isAnonymous: state.isAnonymous,
        width: state.width
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setAnonymous: (isAnonymous) => {
        	console.log("trying to update isAnonymous"+isAnonymous);
            dispatch (updateAnonymous(isAnonymous));
        }
    }
}

const ProfileContainer = connect (mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
