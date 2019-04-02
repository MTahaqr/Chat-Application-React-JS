import React, { Component } from 'react';
import * as firebase from 'firebase';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            uid: this.props.match.params.id,
            userName: '',
            email: '',
        }

        this.getUserData = this.getUserData.bind(this);
    }


    componentWillMount() {
        this.getUserData();
    }


    getUserData() {
        firebase.database().ref('/users/' + this.state.uid).once('value', (snapshot) => {
            this.setState({
                userName: snapshot.val().name,
                email: snapshot.val().email,
            });
        });
    }


    render() {
        return (
            <div className="section user-profile">
                <h3 className="heading-section">User Profile</h3>
                <h4>{ this.state.userName }</h4>
                <h4>{ this.state.email }</h4>
            </div>
        );
    }
}


export default UserProfile;