import React, {Component} from 'react';
import './NavMulti.css';
import {Link} from 'react-router-dom'; 
import Auth from '../../modules/auth/Auth.js';

class NavMulti extends Component {
	render() {
		return (
			<div className="nav-multi">
				<div className="navbar navbar-inverse navbar-static-top" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="">MyFlix</a>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<Auth />
							</ul>
							<ul className="nav navbar-nav">
								<li className="active"><a href="">Home</a></li>
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Admin <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">List</a>
											<ul className="dropdown-menu">
												<li><Link to="/create">Create New List</Link></li>
												<li><a href="">View My List</a></li>
											</ul>
										</li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">My Account</a>
											<ul className="dropdown-menu">
												<li><a href="">Edit Profile</a></li>
											</ul>
										</li>
										
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NavMulti;