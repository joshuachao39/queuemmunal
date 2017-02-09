import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import * as firebase from 'firebase';
import browserHistory from 'react-router';

let formStyle = {
	/* Field: */
	background: "#FFFFFF",
	border: "0 solid rgba(77,77,77,0.78)",
	boxShadow: "0 2px 9px 0 rgba(0,0,0,0.18)",
	/* Text within the field */
	fontFamily: "Quicksand",
	fontSize: 14,
	color: "#C7C7CD",
	letterSpacing: -0.08,
	padding: 10,
	width: "80vw",
	marginTop: 20
};

let buttonStyle = {
	/* Button Background: */
	background: "#FF6D7F",
	borderRadius: 80,
	/* Login: */
	fontFamily: "Quicksand",
	fontSize: 18,
	color: "#FFFFFF",
	letterSpacing: 0,
	width: "50vw",
	border: "none",
	paddingTop: 7,
	paddingBottom: 7,
	marginTop: 40
};

let divStyle = {
	fontFamily: "Quicksand",
	fontSize: 30,
	color: "#3066BE",
	height: "100%",
	width: "100%",
	display: "flex",
	flexFlow: "column nowrap",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#F4F4F8"
};

let errorStyle = {
	fontSize: 15,
	color: "#FF6D7F",
	fontFamily: "Quicksand",
	maxWidth: "80vw",
	textAlign: "center"
}



let SignIn = React.createClass({
	render: function() {
		let errorText = null;
		if (this.state.errorLoggingIn) {
			errorText = <p style={errorStyle}> Sorry, we couldn't find that user in our database. Try again? </p>
		}
		return (
			<div style={divStyle}>
				<img src={logo} className="App-logo" alt="logo" />
				Queuemunnal
				{errorText}
				<input style={formStyle} type="text" value={this.state.email} placeholder="Email" onChange={this.handleUsernameChange} />
				<input style={formStyle} type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} />
				<button style={buttonStyle} className="animated bounceIn" onClick={this.handleSubmit}>Login</button>
			</div>
		);
	},
	handleSubmit: function(event) {
		/*const auth = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
		promise
			.catch(e => this.setState({errorLoggingIn: true}))
			// .then(this.props.router.push('/home'));
		auth.onAuthStateChanged( user => {
			if (user) {
				this.props.router.push('/home');
			}
		}); */

		// hardcode a user first i guess
		if (this.state.email == "username" && this.state.password == "password") {
			this.props.router.push('/mobile');
		} else {
			this.setState({errorLoggingIn: true, email: '', password: ''});
		}
	},
	handleUsernameChange: function(event) {
		this.setState({email: event.target.value});
	},
	handlePasswordChange: function(event) {
		this.setState({password: event.target.value});
	},
	getInitialState: function() {
		return ({
			email: '',
			password: '',
			errorLoggingIn: false
		});
	}
});

export default SignIn;
