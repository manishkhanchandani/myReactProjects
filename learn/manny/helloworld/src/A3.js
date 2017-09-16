import React, {Component} from 'react';

import A4Jumbotron from './A4Jumbotron.js';
import A5Buttons from './A5Buttons.js';
import './A3.css';

class A3 extends Component {
	render() {
		return (
			<div className="container theme-showcase" role="main">
				<A4Jumbotron />
				<A5Buttons />
			</div>
		);	
	}
}

export default A3;