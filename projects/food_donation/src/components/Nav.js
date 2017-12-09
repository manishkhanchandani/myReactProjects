import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {Badge} from 'react-bootstrap';

import {actionGoogleLogin, actionSignOut} from '../actions/MyAction.js';


class Nav extends Component {
	
	googleLogin(e) {
		e.preventDefault();
		this.props.func1();
	}
	
	signOut(e) {
		e.preventDefault();
		this.props.func2();
	}
	
	render() {		
		var showUser = [];
		var navItem1 = [];
		var rightSide = [];
		
		if (this.props.myReducer.uid) {
			var showBadge = '';
			if (this.props.chatReducer.chat_users_total_cnt > 0) {
				showBadge = (<Badge>{this.props.chatReducer.chat_users_total_cnt}</Badge>);
			}
		
			showUser.push(<li key="3" className="myName">{this.props.myReducer.displayName}</li>);
			showUser.push(<li key="4"><Link to="/profile">My Profile</Link></li>);
			showUser.push(<li key="1"><a href="" onClick={this.signOut.bind(this)}>SignOut</a></li>);
			
			navItem1.push(<li key="1"><Link to="/create">Create</Link></li>);
			navItem1.push(<li key="2"><Link to="/">My Account</Link></li>);
			
			
			rightSide.push(<li key="1"><Link to="/chat">Messages {showBadge}</Link> </li>);
		} else {
			showUser.push(<li key="2"><a href="" onClick={this.googleLogin.bind(this)}>Google Login</a></li>);
		}

		
		return (
			<nav className="navbar navbar-inverse navbar-static-top">
		  <div className="container">
			<div className="navbar-header">
			  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			  </button>
			  <Link className="navbar-brand" to="/">Food Donation</Link>
			</div>
			<div id="navbar" className="navbar-collapse collapse">
			  <ul className="nav navbar-nav">
				<li className="active"><Link to="/">Home</Link></li>
				{navItem1}
				<li className="dropdown">
				  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
				  <ul className="dropdown-menu">
					{showUser}
				  </ul>
				</li>
			  </ul>
			  <ul className="nav navbar-nav navbar-right">
				{rightSide}
			  </ul>
			</div>
		  </div>
		</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer,
		chatReducer: state.ChatReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);