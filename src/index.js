import React from 'react';
import ReactDOM from 'react-dom';
import MobileContainer from './components/MobileContainer'
import DesktopContainer from './components/DesktopContainer'
import $ from 'jquery';
import './styles/index.css';

import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCF_-IUfnv4rTfQncPz-9Ja6gcBnaRSSSo",
    authDomain: "queuemmunal.firebaseapp.com",
    databaseURL: "https://queuemmunal.firebaseio.com",
    storageBucket: "queuemmunal.appspot.com",
    messagingSenderId: "376397752355"
  };

 Firebase.initializeApp(config);


 let App = React.createClass({
 	render() {
    if (this.state.width > 480 || this.state.width > this.state.height) {
      return (
        <div className="flexContainer">
          <DesktopContainer />
        </div>
      );
    } else {
      return (
        <MobileContainer />
      );
    }
  },
  updateDimensions(){
    this.setState({
      width: $(window).width(),
      height: $(window).height()
    });
  },
  componentWillMount() {
    this.updateDimensions();
  },
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  },
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
 });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
