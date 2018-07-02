/*** src/index.js   ***/
import React, {Component} from 'react';
import Themes from 'mkhancha-themes';
import Auth from 'mkhancha-auth';
import './style.css';

class Topic extends Component {
	render() {
		const {subject} = this.props;
		return (
			<ul className="dropdown-menu">
				<li><a href={`/issues/${subject}`}>Issue List</a></li>
				<li><a href={`/essays/${subject}`}>Essays</a></li>
				<li><a href={`/mbe/${subject}`}>MBE</a></li>
				<li className="dropdown-submenu">
					<a href="" className="dropdown-toggle" data-toggle="dropdown">Assignments</a>
					<ul className="dropdown-menu">
						<li><a href={`/definitions/${subject}`}>Definitions</a></li>
						<li><a href={`/quizes/${subject}`}>Quizes</a></li>
						<li><a href={`/casebriefs/${subject}`}>Case Briefs</a></li>
						<li><a href={`/midtermA/${subject}`}>MidTerm A</a></li>
						<li><a href={`/midtermB/${subject}`}>MidTerm B</a></li>
					</ul>
				</li>
			</ul>
		);
	}
}


class Header extends Component {

	render() {
		return (
			<div className="navMulti">
				<div className="navbar navbar-inverse navbar-static-top" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="/">California Baby Bar</a>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
								<li className="active"><a href="/">Home</a></li>
							</ul>
							  <ul className="nav navbar-nav">
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Subjects<b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Contracts & UCC</a>
											<Topic subject="contracts" />
										</li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Torts</a>
											<Topic subject="torts" />
										</li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Criminal</a>
											<Topic subject="criminal" />
										</li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Admin</a>
											<ul className="dropdown-menu">
												<li><a href="">Action</a></li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">Definition</a>
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
							  <ul className="nav navbar-nav navbar-right">
								<Themes path={this.props.path} />
								<Auth FirebaseConstant={this.props.FirebaseConstant} config={this.props.config} firebaseApp={this.props.firebaseApp} />
							  </ul>
				
						</div>
					
					</div>
				
				</div>
			</div>
		);
	}
}

export default Header;