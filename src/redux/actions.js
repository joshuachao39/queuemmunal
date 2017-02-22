/**
* action types
*/

export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const UPDATE_ROOM = 'UPDATE_ROOM';


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
