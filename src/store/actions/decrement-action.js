import constant from '../constants';

export default function() {
    
    let action = {
        type: constant.DECREMENT,
        payload: 1,
    }

    return action;
}