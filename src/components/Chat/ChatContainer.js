import React, { Component } from 'react';
import Chat from './Chat';
import connect from 'react-redux/lib/connect/connect';


class ChatContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home section">
                <h3 className="heading-section">{this.state.name}</h3>
                <div className="h-line"></div>
                <div className="row">

                    <div className="chat-section col-md-8"></div>

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
        
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);