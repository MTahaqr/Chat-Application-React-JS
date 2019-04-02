import constant from '../constants';


export default (state = [], action) => {

    switch (action.type) {

        case constant.GET_MY_CONVERSATIONS:

            console.log('GET_MY_CONVOS', action.payload.conversation);
            return [...state, action.payload.conversation];

        case constant.UPDATE_SEEN_STATUS:
            state.map((convo, index) => {
                if (convo.key === action.payload.conversation.key) {
                    state.splice(index, 1, action.payload.conversation);
                    return [...state];
                }
            })
            return [...state];

        case constant.CLEAR_MY_CONVERSATIONS:
            return [];

        default:
            return state;

    }
}