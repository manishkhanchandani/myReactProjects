import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Nav extends Component {
	render() {
		return (
<div>
<nav className="navbar navbar-inverse navbar-static-top">
			  <div className="container">
				<div className="navbar-header">
				  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				  </button>
				  <Link className="navbar-brand" to="/">Food Donation</Link>
				</div>
				<div id="navbar" className="navbar-collapse collapse">
				  <ul className="nav navbar-nav">
					<li className="active"><Link to="/">Home</Link></li>
					<li><Link to="/create">Create</Link></li>
					<li><a href="#contact">Contact</a></li>
					<li className="dropdown">
					  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
					  <ul className="dropdown-menu">
								<li><a href="">Google Login</a></li>
								<li><a href="">Facebook Login</a></li>
								<li><a href="">Twitter Login</a></li>
								<li><a href="">GitHub Login</a></li>
								<li><a href="">SignOut</a></li>
					  </ul>
					</li>
				  </ul>
				  <ul className="nav navbar-nav navbar-right">
					<li><a href="../navbar/">Default</a></li>
					<li className="active"><a href="./">Static top <span className="sr-only">(current)</span></a></li>
					<li><a href="../navbar-fixed-top/">Fixed top</a></li>
				  </ul>
				</div>
			  </div>
			</nav>
				
</div>
		);
	}
}

export default Nav;