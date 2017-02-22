import {LOG_OUT, LOG_IN, UPDATE_ROOM, UPDATE_DIMENSIONS} from './actions';

/**
* state of the app
* loggedIn: true if user is logged in, false otherwise
* currentRoom: name of the room the user is in
*/

const initialState = {
    loggedIn : false,
    currentRoom : undefined,
    height: 0,
    width: 0
};


function appReducers (state, action) {

    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {

    case LOG_OUT: {
        return Object.assign ({}, state, {
            loggedIn: false
        });
    }

    case LOG_IN: {
        return Object.assign ({}, state, {
            loggedIn: true
        });
    }

    case UPDATE_ROOM: {
        return Object.assign ({}, state, {
            currentRoom: action.currentRoom
        });
    }

    case UPDATE_DIMENSIONS: {
        return Object.assign ({}, state, {
            width: action.width,
            height: action.height
        });
    }

    }

    return state;
}

export default appReducers;
