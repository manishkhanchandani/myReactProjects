import React, {Component} from 'react';
import NavMulti from '../OnlineRx/nav-multi/NavMulti.js';
import {BrowserRouter as Router} from 'react-router-dom';


class OnlineRxLayout extends Component {
	render() {
		return (

				<Router>
				<div >
					<NavMulti />
				
				</div>
			</Router>
		);
	}
}

export default OnlineRxLayout;