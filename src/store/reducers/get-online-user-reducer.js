import constant from '../constants';

export default (state = [], action) => {
    switch (action.type) {

        case constant.GET_ONLINE_USERS:
            let user = action.payload.user;
            return [...state, user];

        case constant.REMOVE_OFFLINE_USER:
            state.map((user, index) => {
                if(user.key === action.payload.key){
                    state.splice(index, 1);
                    return state
                }
            });
            return state;

        default:
            return state;
            
    }
}   