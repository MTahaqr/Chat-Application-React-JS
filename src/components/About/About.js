import React, { Component } from 'react';
import './about.css';

class About extends Component {
    render() {
        return (
            <div className="about section">

                <h3 className="heading-section">About - My React Application</h3>
                <div className="h-line"></div>

                <div className="row">

                    <div className="col-md-7">
                        <h4>This is the about page</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quas. Rerum sit quae architecto impedit possimus nihil magni excepturi animi cumque quo officiis, eligendi, non doloremque totam! Eaque, architecto odio.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quas. Rerum sit quae architecto impedit possimus nihil magni excepturi animi cumque quo officiis, eligendi, non doloremque totam! Eaque, architecto odio.
                        </p>
                    </div>

                    <div className="col-md-5 aside-logo-wrapper">
                        <div className="avatar">
                            <img src={require('../../assets/firebase-logo.png')} alt="firebase-logo" className="aside-logo" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default About;