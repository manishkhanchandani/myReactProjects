import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import Auth from '../auth/Auth.js';
//import Themes from '../../Themes.js';
import logo from './nav-images/dctools_logo.png';
import './NavMulti.css';

class NavMulti extends Component {
	render() {
		return (
			<div className="nav-multi">
				<div className="navbar navbar-inverse navbar-static-top" role="navigation">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">
                            	<img alt="DCTools" className="auto-style1" src={logo} />
                        	</Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<Auth />
								
							</ul>	
						</div>

					</div>
				</div>
			</div>
		);
	}
}

export default NavMulti;