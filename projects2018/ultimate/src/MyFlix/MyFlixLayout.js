import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import NavMulti from './nav-multi/NavMulti.js';

import Home from './Home.js'
import Create from './Create.js';
import Categories from './Categories.js';
import Videos from './Videos.js';
import Detail from './Detail.js';

import Test1 from './test/Test1.js';
import UploadFile from '../CategoryList/CityManager/UploadFile.js';

class MyFlixLayout extends Component {
	render() {
		return (
			<Router>
			<div className="myFlix">
				<NavMulti />
				<Switch>
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/test1" component={Test1} />
				<Route exact={true} path="/test2" component={UploadFile} />
				<Route exact={true} path="/view/:viewTemplate" component={Home} />
				<Route exact={true} path="/create" component={Create} />
				<Route exact={true} path="/manage/:list/categories" component={Categories} />
				<Route exact={true} path="/manage/:list/videos" component={Videos} />
				
				<Route exact={true} path="/detail/:video_id" component={Detail} />
				<Route exact={true} path="/:list" component={Home} />
				<Route exact={true} path="/:list/detail/:video_id" component={Detail} />
				<Route exact={true} path="/:list/view/:viewTemplate" component={Home} />
				<Route exact={true} path="/:list/view/:viewTemplate" component={Home} />
				</Switch>
			</div>
			</Router>
		);
	}
}

export default MyFlixLayout;