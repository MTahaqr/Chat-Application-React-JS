import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NotFound404 extends Component {

    render() {
        return (
            <div className="section">
                <h3 className="heading-section">404 - Not Found</h3>
                <div className="h-line"></div>
                <ul>
                    <li>Currently you don't have permission to access the page.</li>
                    <li>It may be remove or moved to another URL.</li>
                </ul>
                <p>Need some <Link to="/contact">Help</Link></p>                
            </div>
        );
    }
}


export default NotFound404;