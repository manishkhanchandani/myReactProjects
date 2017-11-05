import React, {Component} from 'react';

import {
    //HashRouter,
    Route,
    Switch,
	BrowserRouter as Router
} from 'react-router-dom';

import App from 'containers/App/App.jsx';

class Main extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" name="Home" component={App}/>
				</Switch>
			</Router>
		);
	}
}

export default Main;