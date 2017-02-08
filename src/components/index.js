import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../styles/index.css';
import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCF_-IUfnv4rTfQncPz-9Ja6gcBnaRSSSo",
    authDomain: "queuemmunal.firebaseapp.com",
    databaseURL: "https://queuemmunal.firebaseio.com",
    storageBucket: "queuemmunal.appspot.com",
    messagingSenderId: "376397752355"
  };

 Firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
