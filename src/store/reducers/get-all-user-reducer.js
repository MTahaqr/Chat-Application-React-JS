import constant from '../constants';


export default (state = [], action) => {

    switch (action.type) {

        case constant.GET_ALL_USER:
            let user = {
                user: action.payload.user,
                uid: action.payload.uid,
            }
            return [...state, user];
            
        default:
            return state;
    }
}