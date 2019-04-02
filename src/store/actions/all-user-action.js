import constant from '../constants';


export function _getAllUsers(user, uid) {
    const action = {
        type: constant.GET_ALL_USER,
        payload: {
            user: user,
            uid: uid,
        }
    };
    return action;
}