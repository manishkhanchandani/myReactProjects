import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from './auth/Auth.js';

class Nav extends Component {
	
	render() {
	
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
				  <Link className="navbar-brand" to="/">MyComponent</Link>
				</div>
				<div id="navbar" className="navbar-collapse collapse">
				  <ul className="nav navbar-nav">
					<li className="active"><Link to="/">Home</Link></li>
					<Auth />
				  </ul>
				  <ul className="nav navbar-nav navbar-right">
					
				  </ul>
				</div>
			  </div>
			</nav>
		);
	}
}

export default Nav;