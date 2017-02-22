/**
* action types
*/

export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const UPDATE_DIMENSIONS = 'UPDATE_DIMENSIONS';

/**
 * action creators
 */

export function updateRoom (roomName) {
    return {
        type: UPDATE_ROOM,
        roomName: roomName
    }
}

export function logOut () {
    return {
        type: LOG_OUT
    };
}


export function logIn () {
    return {
        type: LOG_IN
    };
}

export function updateContainer (width, height) {
    return {
        type: UPDATE_DIMENSIONS,
        width: width,
        height: height
    };
}

export default {updateRoom, logOut, logIn, updateContainer};