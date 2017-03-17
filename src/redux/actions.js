/**
* action types
*/

export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_DIMENSIONS = 'UPDATE_DIMENSIONS';
export const IS_ANONYMOUS = 'IS_ANONYMOUS';
export const UPDATE_PICTURE_URL = 'UPDATE_PICTURE_URL';

/**
 * action creators
 */

export function updateRoom (roomName, roomKey) {
    return {
        type: UPDATE_ROOM,
        currentRoom: roomName,
        currentRoomKey: roomKey
    }
}

export function updateUser (username, fullname, url) {
    return {
        type: UPDATE_USER,
        username: username,
        fullname: fullname,
        pictureUrl: url
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

export function updateAnonymous () {
    return {
        type: IS_ANONYMOUS
    };
}

export function updatePictureUrl (url) {
    return {
        type: UPDATE_PICTURE_URL,
        pictureUrl: url
    };
}

export default {updatePictureUrl, updateRoom, logOut, logIn, updateContainer, updateAnonymous};
