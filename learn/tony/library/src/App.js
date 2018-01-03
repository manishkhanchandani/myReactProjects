import React, { Component } from 'react';
import NavMulti from './modules/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import SimpleQuiz from './modules/simple-quiz/SimpleQuiz.js';
import AuthEmailLogin from './modules/auth/AuthEmailLogin.js';
import AuthEmailRegister from './modules/auth/AuthEmailRegister.js';

class App extends Component {
  render() {
    return (
		<Router>
			<div >
				<NavMulti />
				{/*<Route exact={true} path="/" component={Main} />*/}
				<Route exact={true} path="/simpleQuiz" component={SimpleQuiz} />
				<Route exact={true} path="/register" component={AuthEmailRegister} />
				<Route exact={true} path="/login" component={AuthEmailLogin} />		
			</div>
		</Router>
    );
  }
}

export default App;
