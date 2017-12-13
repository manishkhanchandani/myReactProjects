import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionGoogleLogin, actionSignOut, getUID, getUsersObj} from './AuthAction.js';

class Auth extends Component {

	googleLogin(e) {
		e.preventDefault();
		this.props.func1();
	}
	
	signOut(e) {
		e.preventDefault();
		this.props.func2();
	}
	
	render() {
		const uid = getUID();
		var showUser = [];
		let myStyle = {
			display: 'block',
			padding: '3px 20px',
			clear: 'both',
			fontWeight: 400,
			lineHeight: 1.42857143,
			color: '#333',
			whiteSpace: 'nowrap'
		};

		if (uid) {
			const userObj = getUsersObj();
			showUser.push(<li key="1" style={myStyle}>{userObj.displayName}</li>);
			showUser.push(<li key="2"><a href="" onClick={this.signOut.bind(this)}>SignOut</a></li>);	
		} else {
			showUser.push(<li key="3"><a href="" onClick={this.googleLogin.bind(this)}>Google Login</a></li>);
		}
		return (
			<li className="dropdown">
			  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
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
		func1: () => {
			dispatch(actionGoogleLogin());
		},
		func2: () => {
			dispatch(actionSignOut());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);