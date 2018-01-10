import React, {Component} from 'react';
import NavMulti from '../DcTools/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Home from '../DcTools/Home.js';

class DcToolsLayout extends Component {
	render() {
		return (
			<Router>
			<div>
				<NavMulti />
				<Route exact={true} path="/" component={Home} />
			</div>
			</Router>
		);
	}
}

export default DcToolsLayout;