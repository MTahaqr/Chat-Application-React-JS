import constant from '../../store/constants';



export default (state = true, action) => {
    
    switch(action.type) {
        
        case constant.START_MAIN_LOADER:
            return true;

        case constant.STOP_MAIN_LOADER:
            return false;

        default:
            return state;

    }
}