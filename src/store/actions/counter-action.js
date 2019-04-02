import constant from '../constants';

export default function() {

    let action = {
        type: constant.INCREMENT,
        payload: 1,
    }

    return action;
}