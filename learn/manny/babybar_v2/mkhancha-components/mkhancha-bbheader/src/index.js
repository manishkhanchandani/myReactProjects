/*** src/index.js   ***/
import React, {Component} from 'react';
import Themes from 'mkhancha-themes';
import Auth from 'mkhancha-auth';
import './style.css';

export const subjects = {
	contracts: {
		name: 'Contracts',
		menu: true
	},
	criminal: {
		name: 'Criminal',
		menu: true	
	},
	torts: {
		name: 'Torts',
		menu: true	
	},
	business_organization: {
		name: 'Business Organization (Agency & Partnership)',
		menu: true	
	},
	criminal_procedure: {
		name: 'Criminal Procedure',
		menu: true	
	},
	real_property: {
		name: 'Real Property',
		menu: true	
	},
	remedies: {
		name: 'Remedies',
		menu: true	
	},
	civil_procedure: {
		name: 'Civil Procedure',
		menu: true	
	},
	constitutional_law: {
		name: 'Constitutional Law',
		menu: true	
	},
	corporations: {
		name: 'Corporations',
		menu: true	
	},
	evidence: {
		name: 'Evidence',
		menu: true	
	},
	administrative_law: {
		name: 'Administrative Law',
		menu: true	
	},
	community_property: {
		name: 'Community Property',
		menu: true	
	},
	professional_responsibility: {
		name: 'Professional Responsibility',
		menu: true	
	},
	trusts: {
		name: 'Trusts',
		menu: true	
	},
	wills: {
		name: 'Wills',
		menu: true	
	}		
};
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
		let uobj = localStorage.getItem('mk-fb-user');
		let users = null;
		if (uobj) {
			users = JSON.parse(uobj);
		}
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
							<a className="navbar-brand" href="/">California Bar Prep</a>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
								<li className="active"><a href="/">Home</a></li>
							</ul>
							  <ul className="nav navbar-nav">
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Subjects<b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										{
											subjects && 
											Object.keys(subjects).map((value, key) => {
												let subject = subjects[value];
												return (<li key={value} className="dropdown-submenu">
														<a href="" className="dropdown-toggle" data-toggle="dropdown">{subject.name}</a>
														<Topic subject={value} />
													</li>);					 
											})
										}
										{
											(users && (users.access_level === 'admin' || users.access_level === 'superadmin')) &&
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
										}
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