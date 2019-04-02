import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Switch } from 'react-router';
import App from '../App/App';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import About from '../About/About';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm.js/SignUpForm';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import FireLoader from '../Loader/FireLoader';
import history from '../../history';
import PorfileCard from '../Profile/ProfileCard';
import { _startLoader, _stopLoader } from '../../store/actions/main-loader-action';
import { _setUserInfo, _removeUser } from '../../store/actions/set-user-info-action';
import { _getAllUsers } from '../../store/actions/all-user-action';
import { _setToLogin, _setToLogout } from '../../store/actions/auth-state-action';
import NotFound404 from '../NotFound404/NotFound404';
import Chat from '../Chat/Chat';
import { _getConversations } from '../../store/actions/get-all-convo-action';
import { _getOnlineUser, _removeOfflineUser } from '../../store/actions/get-online-user-action';
import { _getMyConversation, _updateSeenStatus } from '../../store/actions/get-my-conversations-action';
import UserProfile from '../UserProfile/UserProfile';

class MyRoutes extends Component {

    constructor(props) {
        super(props);
        this.checkAuthState = this.checkAuthState.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
        this.setLogStatus = this.setLogStatus.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.getOnlineUser = this.getOnlineUser.bind(this);
        this.getMyConversation = this.getMyConversation.bind(this);
        this.setChangedChildListenerAtConvos = this.setChangedChildListenerAtConvos.bind(this);
    }


    /* ********************************************* Database Calls ***************************************** */

    // Getting online users and pushing it to 'onlineUsers'
    getOnlineUser() {
        firebase.database()
            .ref('/online')
            .on('child_added', (snapshot) => {
                if (this.props.user.uid !== snapshot.key)
                    this.props.getOnlineUser(snapshot.val(), snapshot.key);
            });
    }


    // Setting Login State to online
    setLogStatus(logStatus) {
        firebase.database()
            .ref('/' + logStatus + '/' + this.props.user.uid)
            .set({
                logStatus: logStatus,
                name: this.props.user.displayName,
            })
            .then((success) => {
                firebase.database()
                    .ref('/users/' + this.props.user.uid + '/logStatus')
                    .set('online');
            });
    }

    setRemoveChildToOnlineUser() {
        firebase.database()
            .ref('/online')
            .on('child_removed', (snapshot) => {
                this.props.removeOfflineUser(snapshot.key);
            });
    }

    // When 'isSeen' or 'isNew' State changes it gives the updated object and set it to 'myConversations'
    setChangedChildListenerAtConvos() {
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats')
            .on('child_changed', (snapshot) => {
                const obj = snapshot.val();
                this.props.updateSeenNew(obj.name, snapshot.key, obj.isSeen, obj.isNew);
            })
    }


    // When a user close a tab it set the loginState to offline
    onDisconnect() {
        if (this.props.isLoggedIn) {
            const uid = this.props.user.uid;
            firebase.database()
                .ref('/online/' + uid)
                .onDisconnect()
                .remove();
            firebase.database()
                .ref('/users/' + uid + '/logStatus')
                .onDisconnect()
                .set('offline');
        }
    }


    // Get all register users and set them to 'allUsers'
    getAllUser() {
        firebase.database()
            .ref('/users')
            .on('child_added', (snapshot) => {
                if (this.props.user.uid !== snapshot.key)
                    this.props.getAllUser(snapshot.val(), snapshot.key);//dispatching action
            });
    }

    // Get current users conversations and set them to 'myConversations'
    getMyConversation() {
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats')
            .on('child_added', (snapshot) => {
                let convo = snapshot.val();
                this.props.getMyConversation(convo.name, snapshot.key, convo.isSeen, convo.isNew);
            });
    }



    // It checks the authentication state
    checkAuthState() {
        const that = this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                that.props.setToLogin();
                // Get the info of current users
                that.props.setUserInfo(user);
                // Get online users
                that.getOnlineUser();
                // Get all register users
                that.getAllUser();
                // Get all conversations of current user
                that.getMyConversation();
                // Setting login status
                that.setLogStatus('online');
                // Setting listener to listen change in conversations
                that.setChangedChildListenerAtConvos();
                // Setting listener for offline users
                that.setRemoveChildToOnlineUser();
                // Redirect to landing page
                history.push('/');
            }
            else {

                that.props.clearUserInfo();
                // 
                that.props.setToLogout();
                // Redirect to landing page
                history.push('/');
            }
            // Stop loader
            that.props.stopLoading();
            // Setting listener to listen for disconnection
            this.onDisconnect();
        });
    }

    /* ****************************************************************************************************** */






    componentWillMount() {
        this.checkAuthState();
    }


    render() {
        return (
            <BrowserRouter>
                <div>
                    {
                        /* ********** if logged in ********** */
                        (this.props.isLoading) ?
                            <FireLoader />
                            :
                            <div>
                                <NavBar />
                                <Switch>
                                    <Route exact path="/" component={App} />
                                    <Route exact path="/home" component={Home} />
                                    <Route exact path="/about" component={About} />
                                    <Route exact path="/contact" component={Contact} />

                                    {
                                        (this.props.isLoggedIn) ?
                                            <Route exact path="/profile" component={PorfileCard} />
                                            :
                                            <Route exact path="/profile" component={SignInForm} />
                                    }
                                    {
                                        (this.props.isLoggedIn) ?
                                            <Route exact path="/chat/:name/:id" component={Chat} /> : null
                                    }
                                    <Route exact path="/profile/:name/:id" component={UserProfile} />
                                    <Route exact path="/signin" component={SignInForm} />
                                    <Route exact path="/signup" component={SignUpForm} />
                                    <Route component={NotFound404} />
                                </Switch>
                                <Footer />
                            </div>
                    }
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        getMyConversation: (conversation, key, isSeen, isNew) => dispatch(_getMyConversation(conversation, key, isSeen, isNew)),
        startLoading: () => dispatch(_startLoader()),
        stopLoading: () => dispatch(_stopLoader()),
        setUserInfo: (user) => dispatch(_setUserInfo(user)),
        clearUserInfo: () => dispatch(_removeUser()),
        setToLogin: () => dispatch(_setToLogin()),
        setToLogout: () => dispatch(_setToLogout()),
        getAllUser: (user, uid) => dispatch(_getAllUsers(user, uid)),
        getAllConversations: (conversation, key) => dispatch(_getConversations(conversation, key)),
        getOnlineUser: (user, key) => dispatch(_getOnlineUser(user, key)),
        updateSeenNew: (name, key, isSeen, isNew) => dispatch(_updateSeenStatus(name, key, isSeen, isNew)),
        removeOfflineUser: (key) => dispatch(_removeOfflineUser(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutes);
























  // // Gets all conversations of current user
    // getAllConversations() {
    //     firebase.database().ref('/users/' + this.props.user.uid + '/chats').on('child_added', (snapshot) => {
    //         let convo = snapshot.val();
    //         this.props.getAllConversations(convo.name, snapshot.key, convo.isSeen, convo.isNew);
    //     });
    // }


    // <i class="material-icons">&#xE5CA;</i>
    // <i class="material-icons">&#xE877;</i> done all
    // <i class="material-icons">&#xE876;</i> done