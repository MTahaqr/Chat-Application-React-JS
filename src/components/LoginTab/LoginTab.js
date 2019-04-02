import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '@firebase/app';
import { connect } from 'react-redux';
import { _setToLogout } from '../../store/actions/auth-state-action';


class LoginTab extends Component {
    constructor(props) {
        super(props);

        this.loggout = this.loggout.bind(this);
        this.checkForLogIn = this.checkForLogIn.bind(this);

        this.state = { isLoggedIn: false };
    }

    componentWillMount() {
        this.checkForLogIn();
    }

    checkForLogIn() {
        let that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.setState({ isLoggedIn: true });
            }
            else {
                that.setState({ isLoggedIn: false });
            }
        });
    }

    loggout() {
        firebase.auth().signOut()
            .then(() => this.props.setToLogout());
    }

    render() {

        return (
            /* ********** if logged in ********** */
            (this.state.isLoggedIn) ?
                (
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Hello {this.props.name}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.loggout} to="/signin">Log off</Link>
                        </li>
                    </ul>
                )
                /* ********** if not logged in ********** */
                : (
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link">Sign In</Link>
                        </li>
                    </ul>
                )
        );
    }
}

const mapStateToProps = (state) => {
    const name = (state.user) ? state.user.displayName : '';
    return {
        name: name,
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        setToLogout: () => dispatch(_setToLogout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginTab);