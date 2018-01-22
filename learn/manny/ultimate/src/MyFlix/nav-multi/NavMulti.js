import React, {Component} from 'react';
import './NavMulti.css';
import {Link} from 'react-router-dom'; 
import Auth from '../../modules/auth/Auth.js';
import Themes from '../../Themes.js';

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
							<Link className="navbar-brand" to="/">MyFlix</Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<Themes />
								<Auth />
							</ul>
							<ul className="nav navbar-nav">
								<li className="active"><Link to="/">Home</Link></li>
								<li><Link to="/create">My List</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NavMulti;