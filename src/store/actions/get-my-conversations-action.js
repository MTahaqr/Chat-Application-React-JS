import constant from '../constants';


export function _getMyConversation(name, key, isSeen, isNew) {
    const action = {
        type: constant.GET_MY_CONVERSATIONS,
        payload: {
            conversation: { name, key, isSeen, isNew },
        }
    }

    return action;
}


export function _clearMyConversation() {
    const action = {
        type: constant.CLEAR_MY_CONVERSATIONS,
    }

    return action;
}

export function _updateMyConversation(name, key, isSeen, isNew) {
    const action = {
        type: constant.UPDATE_MY_CONVERSATIONS,
        payload: { name, key, isSeen, isNew }
    }

    return action;
}


export function _updateSeenStatus(name, key, isSeen, isNew) {
    const action = {
        type: constant.UPDATE_SEEN_STATUS,
        payload: {
            conversation: { name, isSeen, isNew, key }
        }
    }

    return action;
}