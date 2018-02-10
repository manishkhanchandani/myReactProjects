import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NavMulti.css';
import {Link} from 'react-router-dom'; 
import Auth from '../../modules/auth/Auth.js';
import Themes from '../../Themes.js';
import {defaultList} from '../MyFlixAction.js';

class NavMulti extends Component {
	render() {
		
		let url = '';
		if (this.props.myFlixReducer.list) {
			if (this.props.myFlixReducer.list !== defaultList) {
				url = '/' + this.props.myFlixReducer.list;
			}
		}
		
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
							<Link className="navbar-brand" to={`${url}`}>MyFlix</Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<Themes />
								<Auth />
							</ul>
							<ul className="nav navbar-nav">
								<li className="active"><Link to={`${url}`}>Home</Link></li>
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Admin <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">List</a>
											<ul className="dropdown-menu">
												<li><Link to="/create">Manage List</Link></li>
											</ul>
										</li>
										
										
									</ul>
								</li>
								
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Views <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										
										<li><Link to={`${url}/view/View1`}>View 1</Link></li>
										<li><Link to={`${url}/view/View2`}>View 2</Link></li>
										
										
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


const mapStateToProps = (state) => {
	return {
		myFlixReducer: state.MyFlixReducer
	}	
};

export default connect(mapStateToProps)(NavMulti);