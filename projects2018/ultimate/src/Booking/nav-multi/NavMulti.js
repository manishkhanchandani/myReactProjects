import React, {Component} from 'react';
import './NavMulti.css';


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

export default NavMulti;