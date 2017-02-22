import React from 'react';
import ReactDOM from 'react-dom';
import MobileContainer from './components/MobileContainer'
import DesktopContainer from './components/DesktopContainer'

import { updateContainer } from './redux/actions'
import {connect} from 'react-redux'
import $ from 'jquery';
import './styles/index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './redux/reducers'
import firebase from 'firebase';
import 'firebase/database';

// initializing the store
let store = createStore (appReducers);

var config = {
    apiKey: "AIzaSyCF_-IUfnv4rTfQncPz-9Ja6gcBnaRSSSo",
    authDomain: "queuemmunal.firebaseapp.com",
    databaseURL: "https://queuemmunal.firebaseio.com",
    storageBucket: "queuemmunal.appspot.com",
    messagingSenderId: "376397752355"
  };

 firebase.initializeApp(config);


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
        <Provider store={store}>
            <MobileContainer height={this.state.height} width={this.state.width}/>
        </Provider>
      );
    }
  },
  getInitialState() {
    return({
      width: $(window).width(),
      height: $(window).height()
    });
  },
  updateDimensions(){
    this.setState({
      width: $(window).width(),
      height: $(window).height()
    });
    this.props.updateStateDimensions (this.state.width, this.state.height);
    store.getState();
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

function mapDispatchToProps (dispatch) {
  return {
    updateStateDimensions: (width, height) => {
      dispatch (updateContainer(width, height));
    }
  }
}

const AppContainer = connect (null, mapDispatchToProps)(App);

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById('root')
);
