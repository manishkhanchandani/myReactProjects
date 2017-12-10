import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.js';
import Home2 from './Home2.js';
class LayoutHome extends Component {
	render() {
		return (
			<div>
				<h2>This is a roster page!</h2>
				<Route path='/home' component={Home}/>
				<Route path='/home2' component={Home2}/>
			</div>
		);
	}
}

export default LayoutHome;