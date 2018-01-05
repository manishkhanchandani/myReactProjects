import React, {Component} from 'react';
import NavMulti from '../MyFlix/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Home from '../MyFlix/Home.js';
import Create from '../MyFlix/Create.js';

class MyFlixLayout extends Component {
	render() {
		return (
			<Router>
			<div>
				<NavMulti />
				
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/create" component={Create} />
			</div>
			</Router>
		);
	}
}

export default MyFlixLayout;