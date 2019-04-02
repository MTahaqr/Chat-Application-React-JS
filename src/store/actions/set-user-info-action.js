import constant from '../constants';

export function _setUserInfo(user) {
    const action = {
        type: constant.SET_LOGIN_USER_INFO,
        payload: { user }
    }

    return action;
}


export function _removeUser() {
    const action = {
        type: constant.CLEAR_LOGIN_USER,
    }

    return action;
}