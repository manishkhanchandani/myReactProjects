import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {actionGoogleLogin, actionFacebookLogin, actionTwitterLogin, actionGithubLogin, actionSignOut} from './AuthAction.js';
import Themes from '../../Themes.js';
import './Auth.css';
import { loggedIn } from '../../modules/auth/AuthAction';


class Auth extends Component {
	render() {
		var showUser = [];
		var loginLink = null;

		if (this.props.authReducer.uid) {
			loginLink= this.props.authReducer.displayName;
			showUser.push(<Themes />);
			showUser.push(<li key="3"><a href="" onClick={this.props.f_signout.bind(this)}>SignOut</a></li>);

		} else {
			loginLink= 'Login Options';
			showUser.push(<li key="3"><a href="" onClick={this.props.f_google.bind(this)}>Google Login</a></li>);
			showUser.push(<li key="4"><a href="" onClick={this.props.f_facebook.bind(this)}>Facebook Login</a></li>);
			showUser.push(<li key="5"><a href="" onClick={this.props.f_twitter.bind(this)}>Twitter Login</a></li>);
			showUser.push(<li key="6"><a href="" onClick={this.props.f_github.bind(this)}>Github Login</a></li>);
		}
		return (
			<li>
				<a href="" className="dropdown-toggle" data-toggle="dropdown">{loginLink} <b className="caret"></b></a>
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
		f_facebook: (e) => {
			e.preventDefault();
			dispatch(actionFacebookLogin());
		},
		f_twitter: (e) => {
			e.preventDefault();
			dispatch(actionTwitterLogin());
		},
		f_github: (e) => {
			e.preventDefault();
			dispatch(actionGithubLogin());
		},
		f_signout: (e) => {
			e.preventDefault();
			dispatch(actionSignOut());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);