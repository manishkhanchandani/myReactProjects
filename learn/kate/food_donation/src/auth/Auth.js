import React, {Component} from 'react';
import {connect} from 'react-redux';// for reducer
import {actionGoogleLogin, actionFacebookLogin, actionTwitterLogin, actionGithubLogin, actionSignOut} from './AuthAction.js';

class Auth extends Component {
	
	render(){
		return(

			<li>
				<a href="" className="dropdown-toggle" data-toggle="dropdown">User <b className="caret"></b></a>
				<ul className="dropdown-menu">
					<li><a href="" onClick={this.props.f_google.bind(this)}>Google Login</a></li>
					<li><a href="" onClick={this.props.f_signout.bind(this)}>Sign Out</a></li>
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
		f_facebook: () =>  {
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