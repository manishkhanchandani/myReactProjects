import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavMulti from '../Myflix/nav-multi/NavMulti.js';
import Home from '../Myflix/Home.js';
import Test1 from '../Myflix/Test1.js';

class MyflixLayout extends Component {
  render() {
    return (
		<Router>
			<div>
				<NavMulti />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Route exact={true} path="/" component={Home} />
							<Route exact={true} path="/test" component={Test1} />
						</div>
					</div>
				</div>
			</div>
		</Router>
    );
  }
}

export default MyflixLayout;
