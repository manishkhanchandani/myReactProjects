import React, { Component } from 'react';
import Header from 'mkhancha-bbheader';
import AuthHome from 'mkhancha-fbauth';
import {FirebaseConstant, config, firebaseApp} from './MyFirebase.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home.js';
import Notfound from './Notfound.js';
import Essays from './Essays/Essays.js';

class App extends Component {
  render() {
	  let userStr = localStorage.getItem('mk-fb-user');
	  if (!userStr) {
		return (<AuthHome FirebaseConstant={FirebaseConstant} config={config} firebaseApp={firebaseApp}  /> );
	  }
    return (
		<Router>
			<div>
				<Header FirebaseConstant={FirebaseConstant} config={config} firebaseApp={firebaseApp} />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
						<Switch>
							<Route exact={true} path="/" component={Home} />
							<Route exact={true} path="/essays/:subject/:id" component={Essays} />
							<Route exact={true} path="/essays/:subject" component={Essays} />
							<Route component={Notfound}/>
						</Switch>
						</div>
					</div>
				</div>
			</div>
		</Router>
    );
  }
}

export default App;