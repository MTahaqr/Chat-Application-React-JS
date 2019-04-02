import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import history from '../../history';
import { Redirect } from 'react-router';
import { _deleteMsg } from '../../store/actions/chat-msg-action';

class Message extends Component {

    constructor(props) {
        super(props);

        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.deleteMsg = this.deleteMsg.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.updateOnPressEnter = this.updateOnPressEnter.bind(this);
        this.updateMsg = this.updateMsg.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            isEditable: false,
            key: '',
            isEditMode: false,
            newMsg: props.item.message.me,
        }

    }


    handleChange(event) {
        this.setState({
            newMsg: event.target.value,
        });
    }

    onSubmit() {
        this.updateMsg();
        this.toggleEditMode();
        this.setState({ isEditable: false });
    }

    updateMsg() {
        if (this.state.newMsg !== '') {
            firebase.database()
                .ref('/users/' + this.props.user.uid + '/chats/' + this.props.senderUid + '/conversation/' + this.state.key)
                .update({
                    me: this.state.newMsg,
                    date: new Date().toLocaleString(),
                    milliSecond: new Date().getTime(),
                    isUpdated: true,
                });
            firebase.database()
                .ref('/users/' + this.props.senderUid + '/chats/' + this.props.user.uid + '/conversation/' + this.state.key)
                .update({
                    sender: this.state.newMsg,
                    date: new Date().toLocaleString(),
                    milliSecond: new Date().getTime(),
                    isUpdated: true,
                })

        }
        else {
            this.toggleEditMode();
            this.setState({ isEditable: false });
        }

    }

    updateOnPressEnter(event) {
        if (event.key === 'Enter')
            this.onSubmit();
    }

    cancel() {
        this.toggleEditMode()
        this.setState({ isEditMode: false, newMsg: '' });
    }

    toggleEditMode() {
        this.setState({ isEditMode: !this.state.isEditMode });
    }

    componentWillMount() {
        let sendingTime = this.props.item.message.milliSecond;
        let currentTime = new Date().getTime();
        let timeInMinutes = currentTime - sendingTime;
        timeInMinutes = timeInMinutes / 1000;
        let that = this;

        if (timeInMinutes > 60) {
            console.log('times up');
        }
        else {
            that.setState({
                isEditable: true,
                key: that.props.item.key,
            })
            setTimeout(() => {
                if (this.refs.message)
                    that.setState({ isEditable: false, isEditMode: false });
            }, 20000)
        }
    }

    redirectToProfile(name, uid) {
        history.push('/profile');
    }



    deleteMsg() {
        console.log('key: ', this.state.key);
        firebase.database()
            .ref('/users/' + this.props.user.uid + '/chats/' + this.props.senderUid + '/conversation/' + this.state.key)
            .remove();
        firebase.database()
            .ref('/users/' + this.props.senderUid + '/chats/' + this.props.user.uid + '/conversation/' + this.state.key)
            .remove();
    }

    render() {
        return (
            <div ref="message" className={(this.props.item.message.me) ?
                'list-group-item list-group-item-action flex-column align-items-start'
                :
                'list-group-item list-group-item-action flex-column align-items-start sender'}>
                {
                    (!this.state.isEditMode) ?
                        (
                            <div>
                                <div className="d-flex w-100 justify-content-between">
                                    <h4 className="link name mb-1"
                                        onClick={() => (this.props.item.message.me) ?
                                            this.redirectToProfile(this.props.user.displayName, this.props.user.uid)
                                            :
                                            this.redirectToProfile(this.props.senderName, this.props.senderUid)}>
                                        {(this.props.item.message.me) ? 'Me' : this.props.senderName}
                                    </h4>
                                    <small>{this.props.item.message.date} </small>
                                   
                                </div>
                                <p className="mb-1 message">
                                    {
                                        (this.props.item.message.me) ?
                                            this.props.item.message.me
                                            : this.props.item.message.sender
                                    }
                                </p>
                                <div className="right">
                                    {
                                        (this.props.item.message.me && this.state.isEditable) ?
                                            <span>
                                                <i onClick={this.toggleEditMode} className="delete material-icons">&#xE254;</i>

                                                <i onClick={this.deleteMsg} className=" delete material-icons">&#xE872;</i>
                                            </span>
                                            :
                                            null
                                    }
                                    {
                                        (this.props.item.message.isUpdated) ?
                                            <small className="update">Updated</small>
                                            :
                                            null
                                    }
                                    {
                                        (this.props.item.message.isSeen) ?

                                            <i className="material-icons">&#xE877;</i>
                                            :
                                            null

                                    }
                                   
                                   
                                </div>
                            </div>
                        )
                        :
                        <div>
                            <div className="form-group">
                                <input type="text" value={this.state.newMsg} onKeyPress={this.updateOnPressEnter} onChange={this.handleChange} className="form-control" />
                            </div>
                            <div>
                                <button onClick={this.onSubmit} className="btn btn-success">Update</button>
                                <button onClick={this.toggleEditMode} className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteMsg: (key) => dispatch(_deleteMsg(key))
    }
}
export default connect(mapStateToProps, null)(Message);

