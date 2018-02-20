import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NavMulti.css';
import {Link} from 'react-router-dom'; 
import Auth from '../../modules/auth/Auth.js';
import Themes from '../../Themes.js';


class NavMulti extends Component {
	render() {
		let ipDetails = [];
		if (this.props.categoryListReducer.ipDetails) {
		  var location1 = [];
		  var location2 = [];
		  for (var x in this.props.categoryListReducer.ipDetails) {
			if (x === 'ip') {
			  ipDetails.push(<li key="2"><Link to="/">{this.props.categoryListReducer.ipDetails[x]}</Link></li>);
			  continue;
			}
			if (x === 'lat' || x === 'lng') {
			  location2.push(this.props.categoryListReducer.ipDetails[x]);
			  continue;
			}
			
			location1.push(this.props.categoryListReducer.ipDetails[x]); 
		  }
		  
		  var locationString1 = location1.join(', ');
		  ipDetails.push(<li key="3"><Link to="/">{locationString1}</Link></li>);
		  var locationString2 = location2.join(', ');
		  ipDetails.push(<li key="4"><Link to="/">{locationString2}</Link></li>);
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
							<a className="navbar-brand" href="">CategoryList.us</a>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<Themes />
								<Auth />
								<li className="dropdown">
								  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Location<span className="caret"></span></a>
								  <ul className="dropdown-menu">
									{ipDetails}
								  </ul>
								</li>
							</ul>
							<ul className="nav navbar-nav">
								<li className="active"><a href="">Home</a></li>
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Menu 1 <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										<li><a href="">Action</a></li>
										<li><a href="">Another action</a></li>
										<li><a href="">Something else here</a></li>
										<li className="divider"></li>
										<li><a href="">Separated link</a></li>
										<li className="divider"></li>
										<li><a href="">One more separated link</a></li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
											<ul className="dropdown-menu">
												<li><a href="">Action</a></li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
													<ul className="dropdown-menu">
														<li className="dropdown-submenu">
															<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
															<ul className="dropdown-menu">
																<li><a href="">Action</a></li>
																<li><a href="">Another action</a></li>
																<li><a href="">Something else here</a></li>
																<li className="divider"></li>
																<li><a href="">Separated link</a></li>
																<li className="divider"></li>
																<li><a href="">One more separated link</a></li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</li>
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Menu 2 <b className="caret"></b></a>
									<ul className="dropdown-menu">
										<li><a href="">Action</a></li>
										<li><a href="">Another action</a></li>
										<li><a href="">Something else here</a></li>
										<li className="divider"></li>
										<li><a href="">Separated link</a></li>
										<li className="divider"></li>
										<li><a href="">One more separated link</a></li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
											<ul className="dropdown-menu">
												<li><a href="">Action</a></li>
												<li><a href="">Another action</a></li>
												<li><a href="">Something else here</a></li>
												<li className="divider"></li>
												<li><a href="">Separated link</a></li>
												<li className="divider"></li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
													<ul className="dropdown-menu">
														<li className="dropdown-submenu">
															<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
															<ul className="dropdown-menu">
																<li><a href="">Action</a></li>
																<li><a href="">Another action</a></li>
																<li><a href="">Something else here</a></li>
																<li className="divider"></li>
																<li><a href="">Separated link</a></li>
																<li className="divider"></li>
																<li><a href="">One more separated link</a></li>
															</ul>
														</li>
													</ul>
												</li>
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

const mapStateToProps = (state) => {
	return {
		categoryListReducer: state.CategoryListReducer
	}	
};


export default connect(mapStateToProps)(NavMulti);