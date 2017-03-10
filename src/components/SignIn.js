import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import {updateUser} from '../redux/actions';
import {connect} from 'react-redux';
import {database} from '../database/init';
import browserHistory from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize("UA-93278922-1");

let ga = ReactGA.ga();

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

let signUpStyle = {
    fontSize: 15,
    paddingTop: 10,
    textDecoration: "underline"
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
                Queuemmunal
                {errorText}
                <input style={formStyle} type="text" value={this.state.username} placeholder="Email" onChange={this.handleUsernameChange} />
                <input style={formStyle} type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} />
                <button style={buttonStyle} className="animated bounceIn" onClick={this.handleSubmit}>Login</button>

                <p style={signUpStyle} onClick={this.signUpClicked}>
                    New? Sign up here.
                </p>
            </div>
        );
    },
    signUpClicked: function(event) {
        this.props.router.push('/SignUp');
    },
    handleSubmit: function(event) {

        var that = this;

        database.ref('/users/' + this.state.username).once('value').then(function(snapshot) {
            var user = snapshot.val();
            var password = undefined;
            if (user != null) {
                password = user.password;
            }

            if (password === that.state.password) {
                that.props.updateStateUser (that.state.username, snapshot.val().name, snapshot.val().pictureUrl);
                console.log("submit pushed");
                that.props.router.push ('/mobile_redesigned');

            }
            else {
                that.setState({errorLoggingIn: true, username: '', password: ''});
            }
        });

    },
    handleUsernameChange: function(event) {
        this.setState({username: event.target.value});
    },

    handlePasswordChange: function(event) {
        this.setState({password: event.target.value});
    },

    getInitialState: function() {
        return ({
            username: '',
            password: '',
            errorLoggingIn: false
        });
    }
});

function mapDispatchToProps (dispatch) {
    return {
        updateStateUser: (username, name, url) => {
            dispatch (updateUser(username,name, url));
        }
    }
}

const SignInContainer = connect (null, mapDispatchToProps)(SignIn);
export default SignInContainer;
