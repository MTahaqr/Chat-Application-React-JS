import React, { Component } from 'react';
import './NavBar.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginTab from '../LoginTab/LoginTab';

class NavBar extends Component {

	render() {
		return (

			<nav className="navbar navbar-expand-lg navbar-light bg-light">

				<Link className="navbar-brand" to="/"><img className="logo" alt="firebse" src={require('../../assets/firebase-logo.png')} /></Link>

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">

					<ul className="navbar-nav mr-auto">

						<li className="nav-item active">
							<Link className="nav-link" id="home" to="/home" ref={(el) => this.home = el}>Home <span className="sr-only">(current)</span></Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" id="about" to="/about" ref={(el) => this.about = el}>About</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" id="contact" to="/contact" ref={(el) => this.contact = el}>Contact</Link>
						</li>

					</ul>
					<LoginTab />
				</div>
			</nav>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		counter: state.counter,
	}
}

export default connect(mapStateToProps, null)(NavBar);


