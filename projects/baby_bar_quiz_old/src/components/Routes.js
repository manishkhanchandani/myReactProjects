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
					<Route path="/" component={Main} />
				</Switch>
			</div>
		);
	}
}

export default Routes;