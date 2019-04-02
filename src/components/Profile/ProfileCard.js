import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile-card.css';

class ProfileCard extends Component {
    render() {
        return (
            <div className="profile-header section panel panel-default">
                <div className="panel-heading">
                    <h3 className="heading-section">Profile</h3>
                </div>
                <div className="panel-body">
                    <h4>Name: {this.props.user.displayName}</h4>
                    <h4>Email: {this.props.user.email}</h4>
                    <h4>Uid: {this.props.user.uid}</h4>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(ProfileCard);