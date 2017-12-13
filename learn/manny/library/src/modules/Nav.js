import React, {Component} from 'react';

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
			  <a className="navbar-brand" href="/">Library</a>
			</div>
			<div id="navbar" className="navbar-collapse collapse">
			  <ul className="nav navbar-nav">
				<li className="active"><a href="/">Home</a></li>
				<li className="dropdown">
				  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
				  <ul className="dropdown-menu">
					<li><a href="/">Google</a></li>
				  </ul>
				</li>
			  </ul>
			  <ul className="nav navbar-nav navbar-right">
				<li><a href="/">Google</a></li>
			  </ul>
			</div>
		  </div>
		</nav>
		);
	}
}


export default Nav;