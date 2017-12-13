import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionGoogleLogin} from '../modules/auth/AuthAction.js'; 
import './Home.css';


class Home extends Component {
	googleLogin(e) {
		e.preventDefault();
		this.props.func1();
	}
	render() {
		
		return (
			<div className="containerHome">
				<div className="top">
					<h1 id="title"><span id="logo">California Law <span>Baby Bar Quiz</span></span></h1>
				</div>
				<div className="login-box animated fadeInUp">
					<div className="box-header">
						<h2>Log In</h2>
					</div>
					<a className="btn btn-success" onClick={this.googleLogin.bind(this)}>Google Login</a>
				</div>
			</div>
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
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);