import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import NavMulti from './nav-multi/NavMulti.js';

import Home from './Home.js'
import Create from './Create.js';
import Categories from './Categories.js';
import Videos from './Videos.js';

class MyFlixLayout extends Component {
	render() {
		return (
			<Router>
			<div>
				<NavMulti />
				
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/create" component={Create} />
				<Route exact={true} path="/manage/:list/categories" component={Categories} />
				<Route exact={true} path="/manage/:list/videos" component={Videos} />
			</div>
			</Router>
		);
	}
}

export default MyFlixLayout;