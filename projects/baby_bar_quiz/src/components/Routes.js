import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'; 
import Main from './Main.js';
import Edit from './Edit.js';
import Notfound from './Notfound.js';

class Routes extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact={true} path="/" component={Main} />
					<Route exact={true} path="/edit" component={Edit} />
					<Route component={Notfound} />
				</Switch>
			</div>
		);
	}
}

export default Routes;