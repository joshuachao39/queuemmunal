import {LOG_OUT, LOG_IN, UPDATE_USER, UPDATE_ROOM, UPDATE_DIMENSIONS, IS_ANONYMOUS} from './actions';

/**
* state of the app
* loggedIn: true if user is logged in, false otherwise
* currentRoom: name of the room the user is in
*/

const initialState = {
    loggedIn : false,
    currentRoom : undefined,
    currentRoomKey: undefined,
    height: 0,
    width: 0,
    username: "",
    fullname: "",
    pictureUrl: "",
    isAnonymous: false
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
            currentRoom: action.currentRoom,
            currentRoomKey: action.currentRoomKey
        });
    }

    case UPDATE_USER: {
        return Object.assign ({}, state, {
            username: action.username,
            fullname: action.fullname,
            pictureUrl: action.pictureUrl
        })
    }

    case UPDATE_DIMENSIONS: {
        return Object.assign ({}, state, {
            width: action.width,
            height: action.height
        });
    }

    case IS_ANONYMOUS: {
        return Object.assign ({}, state, {
            isAnonymous: action.isAnonymous
        });
    }

    }

    return state;
}

export default appReducers;
