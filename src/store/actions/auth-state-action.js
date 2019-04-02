import constant from '../constants';

export function _setToLogin() {
    const action = {
        type: constant.AUTH_STATE_IN,
    }
    return action;
}



export function _setToLogout() {
    const action = {
        type: constant.AUTH_STATE_OUT,
    }
    return action;
}
