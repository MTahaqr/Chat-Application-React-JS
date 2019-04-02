import constant from '../constants';

export function _getConversations(name, key, seenStatus) {
    console.log('Get all convo', name, key,seenStatus);
    const action = {
        type: constant.GET_ALL_CONVERSATIONS,
        payload: { name, key, seenStatus }
    }

    return action;
}