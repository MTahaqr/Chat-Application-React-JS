import { combineReducers } from 'redux';
import loader from '../reducers/main-loader-reducer';
import setUser from '../reducers/set-user-info-reducer';
import setAuthState from '../reducers/auth-state-reducer';
import allUser from '../reducers/get-all-user-reducer';
import chat from '../reducers/chat-message-reducer';
import onlineUserReducer from '../reducers/get-online-user-reducer';
import myConversations from '../reducers/get-my-conversation-reducer';

export default combineReducers({
    /* ********** Reducer for dispatching main loader actions ********** */
    isLoading: loader,
    user: setUser,
    isLoggedIn: setAuthState,
    allUser: allUser,
    conversation: chat,
    onlineUsers: onlineUserReducer,
    myConversations: myConversations,
});