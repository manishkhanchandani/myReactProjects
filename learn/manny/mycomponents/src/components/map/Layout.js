import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import {actionGoogleLogin, actionSignOut} from '../../actions/MyAction.js';

import MapBasic from './Basic.js';

class MapLayout extends Component {
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
		var rightSide = [];
		
		if (this.props.myReducer.uid) {		
			showUser.push(<li key="3" className="myName">{this.props.myReducer.displayName}</li>);
			showUser.push(<li key="1"><a href="" onClick={this.signOut.bind(this)}>SignOut</a></li>);
					
			rightSide.push(<li key="4" className="myName">{this.props.myReducer.displayName}</li>);
		} else {
			showUser.push(<li key="2"><a href="" onClick={this.googleLogin.bind(this)}>Google Login</a></li>);
		}
		return (
			<div class="maps">
				<nav className="navbar navbar-inverse navbar-static-top">
					  <div className="container">
						<div className="navbar-header">
						  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						  </button>
						  <Link className="navbar-brand" to="/">Maps</Link>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
						  <ul className="nav navbar-nav">
							<li className="active"><Link to="/">Home</Link></li>
							<li className="dropdown">
							  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Utilities <span className="caret"></span></a>
							  <ul className="dropdown-menu">
								<li><Link to="/maps/basic">Basic Map</Link></li>
							  </ul>
							</li>
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
					<Switch>
					<Route path={`${this.props.match.path}/basic`} component={MapBasic} />
					</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(MapLayout);