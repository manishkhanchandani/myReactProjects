import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionGoogleLogin, actionFacebookLogin, actionTwitterLogin, actionGithubLogin, actionSignOut} from './AuthAction.js';
import './Auth.css';

class Auth extends Component {
	render() {
		var showUser = [];		
		if (this.props.authReducer.uid) {
			showUser.push(<li key="1" className="myName">{this.props.authReducer.displayName}</li>);
			showUser.push(<li key="2"><a href="" onClick={this.props.f_signout.bind(this)}>SignOut</a></li>);
		} else {
			showUser.push(<li key="3"><a href="" onClick={this.props.f_google.bind(this)}>Google Login</a></li>);
		}
		return (
			<li>
				<a href="" className="dropdown-toggle" data-toggle="dropdown">User <b className="caret"></b></a>
				<ul className="dropdown-menu">
					{showUser}
				</ul>
			</li>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		authReducer: state.AuthReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		f_google: (e) => {
			e.preventDefault();
			dispatch(actionGoogleLogin());
		},
		f_facebook: () => {
			dispatch(actionFacebookLogin());
		},
		f_twitter: () => {
			dispatch(actionTwitterLogin());
		},
		f_github: () => {
			dispatch(actionGithubLogin());
		},
		f_signout: (e) => {
			e.preventDefault();
			dispatch(actionSignOut());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);