import constant from '../constants';


export function _getOnlineUser(user, key) {
    const action = {
        type: constant.GET_ONLINE_USERS,
        payload: {
            user: { user, key }
        }
    };

    return action;
}

export function _removeOfflineUser(key) {
    const action = {
        type: constant.REMOVE_OFFLINE_USER,
        payload: { key }
    }
    
    return action;
}