import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

	redirectToChatPage(name, uid) {
		if (this.props.isLoggedIn)
			this.props.history.push('chat/' + name + '/' + uid);
		else
			this.props.history.push('/signin');
	}

	render() {
		return (
			<div className="app section">

				<h3 className="heading-section">All User</h3>

				<div className="h-line"></div>
				<div className="row">
					<ul className="col-md-6">
						{
							this.props.allUser.map((item, index) => {

								return <li key={index} id={item.uid} className="list-group-item">
									<h4 className="col-md-8">{item.user.name}</h4>
									<button onClick={this.redirectToChatPage.bind(this, item.user.name, item.uid)} className="btn btn-primary">
										Say Hello
									</button>
								</li>
							})
						}
					</ul>
					{
						(this.props.isLoggedIn) ?
							<ul className="col-md-6">
								{
									this.props.onlineUsers.map((item, index) => {

										return (
											<li key={index} id={item.user.key} className="list-group-item">
												<h4 className="col-md-8">
													<i className="material-icons">&#xE061;</i>
													{item.user.name}
												</h4>

												<button
													onClick={this.redirectToChatPage.bind(this, item.user.name, item.key)}
													className="btn btn-primary">
													Say Hello
											</button>
											</li>)
									})
								}
							</ul>
							: null
					}
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		allUser: state.allUser,
		isLoggedIn: state.isLoggedIn,
		onlineUsers: state.onlineUsers,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
