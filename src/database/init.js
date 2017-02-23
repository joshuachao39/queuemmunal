import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import config from './database.config.js';

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

export let database = firebase.database();
export let storageRef = firebase.storage().ref();
export let firebaseApp = firebase;
