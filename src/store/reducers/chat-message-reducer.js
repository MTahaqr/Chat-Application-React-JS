import constant from '../constants';

export default (state = [], action) => {
    switch (action.type) {

        case constant.GET_CHAT_MESSAGES:
            let message = {
                message: action.payload.message,
                key: action.payload.key,
            };
            return [...state, message];

        case constant.DELETE_MSG: {
            let key = action.payload.key;
            console.log('DELETE_MSG', action.payload)
            state.map((item, index) => {
                if (key === item.key) {
                    state.splice(index, 1);
                    return [...state];
                }
            });
            return [...state];
        }

        case constant.EDIT_MSG: {
            console.log('EDIT_MSG', action.payload.message)
            let key = action.payload.key;
            state.map((item, index) => {
                if (key === item.key) {
                    state.splice(index, 1, { message: action.payload.message, key: action.payload.key });
                    return state;
                }
            });
            return state;
        }

        case constant.CLEAR_CHAT_MESSAGES:
            return [];

        default:
            return state;

    }
};