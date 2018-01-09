import React, {Component} from 'react';
import NavMulti from '../MyFlix/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Home from '../MyFlix/Home.js';
import Create from '../MyFlix/Create.js';
import Categories from '../MyFlix/Categories.js';

class MyFlixLayout extends Component {
	render() {
		return (
			<Router>
			<div>
				<NavMulti />
				
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/create" component={Create} />
				<Route exact={true} path="/manage/:list/categories" component={Categories} />
			</div>
			</Router>
		);
	}
}

export default MyFlixLayout;