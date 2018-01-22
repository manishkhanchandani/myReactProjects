import React, {Component} from 'react';
import NavMulti from './nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home  from './Home.js';
import Create  from './Create.js';
import Confirm  from './Confirm.js';
import Categories  from './Categories.js';
import Videos  from './Videos.js';
import Detail  from './Detail.js';




class MyFlixLayout extends Component {
	render() {
		return (
			<Router>
			<div>
			
				<NavMulti />
				<Switch>
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/create" component={Create} />
				<Route exact={true} path="/confirm" component={Confirm} />
				<Route exact={true} path="/manage/:list/categories" component={Categories} />
				<Route exact={true} path="/manage/:list/videos" component={Videos} />
				
				<Route exact={true} path="/detail/:video_id" component={Detail} />
				<Route exact={true} path="/:list" component={Home} />
				<Route exact={true} path="/:list/detail/:video_id" component={Detail} />
				</Switch>
				
				
				
				
			</div>
			</Router>
		);
	}
}

export default MyFlixLayout;// JavaScript Document