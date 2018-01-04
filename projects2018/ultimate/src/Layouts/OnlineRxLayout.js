import React, {Component} from 'react';
import NavMulti from '../OnlineRx/nav-multi/NavMulti.js';

class OnlineRxLayout extends Component {
	render() {
		return (

				<Router>
				<div >
					<NavMulti />
				
					<Route exact={true} path="/Home" component={SimpleQuiz} />
					<Route exact={true} path="/register" component={AuthEmailRegister} />
					<Route exact={true} path="/login" component={AuthEmailLogin} />
					
				
				</div>
			</Router>
		);
	}
}

export default OnlineRxLayout;