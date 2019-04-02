import constant from '../constants';


export default (state = false, action) => {

    switch(action.type) {

        case constant.AUTH_STATE_IN:
            return true;

        case constant.AUTH_STATE_OUT:
            return false;

        default:
            return state;
            
    }
}
