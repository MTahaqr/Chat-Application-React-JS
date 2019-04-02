import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './fireloader.css';

class FireLoader extends Component {

    render() {
        return (
            <div className="fireloader">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/"><img src={require('../../assets/firebase-logo.png')} className="logo" alt="firebase logo" /></Link>
                        </div>
                    </div>
                </nav>
                <div className="avatar-wrapper">
                    <div className="loader">
                        <img src={require('../../assets/firebase-logo.png')} alt="    firebase-logo" className="aside-logo" />
                        <div className="linear-activity">
                            <div className="indeterminate"></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default FireLoader;