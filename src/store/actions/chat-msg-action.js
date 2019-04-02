import constant from '../constants';

export function _getChatMessages(message, key, uid) {
    const action = {
        type: constant.GET_CHAT_MESSAGES,
        payload: {
            message: message,
            key: key,
        }
    }

    return action;
}


export function _clearChatMessages() {
    const action = {
        type: constant.CLEAR_CHAT_MESSAGES,
    }

    return action;
}


export function _deleteMsg(key) {
    const action = {
        type: constant.DELETE_MSG,
        payload: { key },
    }

    return action;
}

export function _editMsg(message, key) {
    const action = {
        type: constant.EDIT_MSG,
        payload: { message, key }
    }
    
    console.log('action: ', message, key);
    return action;
}

export function _unreadMsg() {
    const action = {
        type: constant.UN_READ
    }

    return action;
}