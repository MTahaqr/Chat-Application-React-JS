import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { _getChatMessages, _clearChatMessages, _deleteMsg, _editMsg } from '../../store/actions/chat-msg-action';
import './chat.css';
import { withRouter } from 'react-router-dom';
import Message from './Message';

class Chat extends Component {
    constructor(props) {

        super(props);

        this.state = {
            senderUid: this.props.match.params.id,
            name: this.props.match.params.name,
            message: '',
            lastMessage: {},
        }

        this.setChangedListenerForConversation = this.setChangedListenerForConversation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.setLastMsgToSeen = this.setLastMsgToSeen.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.getMessageFromFirebase = this.getMessageFromFirebase.bind(this);
        this.redirectToAnotherChat = this.redirectToAnotherChat.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.sendMessageToDb = this.sendMessageToDb.bind(this);
        this.setToSeen = this.setToSeen.bind(this);
        this.setToUnSeen = this.setToUnSeen.bind(this);
        this.setRemoveChildListenerForConversation = this.setRemoveChildListenerForConversation.bind(this);
        console.log(props.user.displayName);
    }

    /* ********************* handling DOM events ********************* */
    handleChange(event) {
        switch (event.target.name) {
            case 'message':
                this.setState({ message: event.target.value });
                return;
            default:
                return;
        }
    }

    handleEnter(event) {
        if (event.key === 'Enter')
            this.onSubmit();
    }

    onSubmit() {
        this.sendMessageToDb();
    }

    sendMessageToDb() {
        const that = this;
        if (this.state.message !== '') {
            let key = new Date().getTime();

            firebase.database()
                .ref('/users/' + that.props.user.uid + '/chats/' + that.state.senderUid + '/conversation/' + key)
                .set({ me: that.state.message, date: new Date().toLocaleString(), milliSecond: new Date().getTime() })
                .then(() => {
                    firebase.database()
                        .ref('/users/' + that.state.senderUid + '/chats/' + that.props.user.uid + '/conversation/' + key)
                        .set({ sender: that.state.message, date: new Date().toLocaleString(), milliSecond: new Date().getTime() })
                        .then((success) => {
                            that.setState({ message: '' })
                            that.setToUnSeen();
                        })
                        .catch((error) => {
                            console.log('Failed to send message', error);
                        });
                });
        }

        this.setLastMsgToSeen();
    }


    setToSeen() {

        firebase.database()
            .ref('/users/' + this.state.senderUid + '/chats/' + this.props.user.uid + '/isSeen')
            .set('seen');
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/isNew')
            .set(false);
        this.setLastMsgToSeen();
    }

    setLastMsgToSeen() {
        let lastMsg = this.props.conversation[this.props.conversation.length - 1];

        if (lastMsg){
            firebase.database()
            .ref('/users/' + this.state.senderUid + '/chats/' + this.props.user.uid + '/conversation/' + lastMsg.key + '/isSeen')
            .set(true);
        }
            
    }

    setToUnSeen() {
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/isSeen')
            .set('unseen');
        firebase.database()
            .ref('/users/' + this.state.senderUid + '/chats/' + this.props.user.uid + '/isNew')
            .set(true);

    }

    disposeFirebaseRef() {
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/conversation')
            .off();
    }

    redirectToAnotherChat(name, senderUid) {

        this.disposeFirebaseRef();
        this.setState({
            name: name,
            senderUid: senderUid,
        }, () => {
            this.getMessageFromFirebase(this.state.name, this.state.senderUid);
        });
        this.props.history.push('/chat/' + name + '/' + senderUid);
    }


    getMessageFromFirebase(name, uid) {
        this.props.clearMessage();
        if (this.props.user.uid) {

            let key = new Date().getTime();

            firebase.database()
                .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/name')
                .set(this.state.name);

            firebase.database()
                .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/conversation')
                .once('value', (snapshot) => {

                    if (!snapshot.val()) {
                        firebase.database()
                            .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/conversation/' + key)
                            .set({
                                me: 'Hello There',
                                milliSecond: new Date().getTime(),
                                date: new Date().toLocaleString(),
                            })
                            .then(() => {
                                firebase.database()
                                    .ref('/users/' + this.state.senderUid + '/chats/' + this.props.user.uid + '/conversation/' + key)
                                    .set({
                                        sender: 'Hello There',
                                        milliSecond: new Date().getTime(),
                                        date: new Date().toLocaleString(),
                                    })
                                    .then((success) => {
                                        firebase.database()
                                            .ref('/users/' + this.state.senderUid + '/chats/' + this.props.user.uid + '/name')
                                            .set(this.props.user.displayName);
                                        console.log('Successsfully send message');
                                    })
                                    .catch((error) => {
                                        console.log('Failed to send message', error);
                                    });
                            });
                    }
                })
        }
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/conversation')
            .on('child_added', (snapshot) => {
                this.props.getMessage(snapshot.val(), snapshot.key, this.state.senderUid);

                this.setState({
                    lastMessage: {
                        message: snapshot.val(),
                        key: snapshot.key,
                    }
                });

            });
    }


    // Listen for deleteing msg
    setRemoveChildListenerForConversation() {
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/conversation')
            .on('child_removed', (snapshot) => {
                this.props.deleteMsg(snapshot.key);
            })
    }


    // Listen for updated msg 
    setChangedListenerForConversation() {
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats/' + this.state.senderUid + '/conversation')
            .on('child_changed', (snapshot) => {
                console.log('Updated', snapshot.val(), snapshot.key);
                this.props.editMsg(snapshot.val(), snapshot.key);
            })
    }

    /* ********************* handling life cycle events ********************* */
    componentDidMount() {
        this.textBox.focus();
    }


    componentWillMount() {
        this.getMessageFromFirebase(this.state.name, this.state.senderUid);
        this.setRemoveChildListenerForConversation();
        this.setChangedListenerForConversation();
    }

    componentWillUnmount() {
        this.disposeFirebaseRef();
        this.props.clearMessage();
    }

    componentWillUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.node.scrollIntoView({ behavior: "smooth" });
    }

    redirectToProfile(name, uid) {
        this.disposeFirebaseRef();
        this.props.history.push('/profile/' + name + '/' + uid);
    }


    render() {
        return (
            <div className="home section">
                <h3 className="heading-section">{this.state.name}</h3>
                <div className="h-line"></div>
                <div className="row">

                    <div className="chat-section col-md-8">
                        <div className="conversation">

                            <ul className="list-group">
                                {
                                    this.props.conversation
                                        .map((item, index) => {
                                            return (
                                                <Message
                                                    item={item}
                                                    key={index}
                                                    senderName={this.state.name}
                                                    senderUid={this.state.senderUid} />
                                            );
                                        })
                                }
                                <li className="scroll-to-me"></li>
                                <li className="scroll-to-me"></li>
                                <li className="scroll-to-me" ref={node => this.node = node}></li>
                            </ul>

                        </div>

                        <div className="send-message-wrapper">
                            <div className="form-group">
                                <input type="text" name="message" onFocus={this.setToSeen} value={this.state.message} onKeyPress={this.handleEnter} onChange={this.handleChange} ref={el => this.textBox = el} className="form-control" />
                                <button onClick={this.onSubmit} className="btn btn-primary send-button">Send</button>
                            </div>
                        </div>

                    </div>
                    <div className="recent-chat-section col-md-4">
                        <ul className="list-group">
                            {
                                this.props.myConversations.map((convo, index) => {
                                    return (
                                        <li
                                            key={convo.key}
                                            className={(convo.isNew) ? 'new list-group-item' : 'old list-group-item'}>
                                            <div>
                                                <h4
                                                    onClick={this.redirectToAnotherChat.bind(this, convo.name, convo.key)}
                                                    className="link name">
                                                    {convo.name}
                                                </h4>
                                                <div className="right">{(convo.isSeen === 'seen') ?
                                                    <i className="material-icons">&#xE877;</i>
                                                    :
                                                    <i className="material-icons">&#xE876;</i>
                                                }</div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        conversation: state.conversation,
        myConversations: state.myConversations,
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        getMessage: (msg, key, senderUid) => dispatch(_getChatMessages(msg, key, senderUid)),
        clearMessage: () => dispatch(_clearChatMessages()),
        deleteMsg: (key) => dispatch(_deleteMsg(key)),
        editMsg: (message, key) => dispatch(_editMsg(message, key)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));





