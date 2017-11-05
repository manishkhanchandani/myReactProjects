import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';

import {style} from "variables/Variables.jsx";

import appRoutes from 'routes/app.jsx';

class HomeLoggedIn extends Component {

	render() {
		return (
			<div className="wrapper">
				<div className="row">
					HomeLoggedIn
				</div>
			</div>
		);
	}
}


export default HomeLoggedIn;