import React, {Component} from 'react';
import NavMulti from '../MyFlix/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 


class MyFlixLayout extends Component {
	render() {
		return (
			<div>
				<NavMulti />
				MyFlixLayout
			</div>
		);
	}
}

export default MyFlixLayout;