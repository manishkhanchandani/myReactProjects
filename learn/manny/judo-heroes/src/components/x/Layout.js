// src/components/Medal.js
import React, {Component} from 'react';
import { Link } from 'react-router';

class AthletePreview  extends Component {
	render() {
		return (
			<div className="app-container">
			<header>
			  <Link to="/">
				<img className="logo" src="/img/logo-judo-heroes.png"/>
			  </Link>
			</header>
			<div className="app-content">{this.props.children}</div>
			<footer>
			  <p>
				This is a demo app to showcase universal rendering and routing with <strong>React</strong> and <strong>Express</strong>.
			  </p>
			</footer>
		  </div>
		);
	}
}

export default AthletePreview ;