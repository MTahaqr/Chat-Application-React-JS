import constant from '../../store/constants';

export function _startLoader() {
    const action = {
        type: constant.START_MAIN_LOADER,
    }
    return action;
}



export function _stopLoader() {
    const action = {
        type: constant.STOP_MAIN_LOADER,
    }
    return action;
}