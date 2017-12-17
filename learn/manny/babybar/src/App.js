import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import {getUID} from './components/auth/AuthAction.js';
import NavMulti from './components/NavMulti.js';
import Home from './components/Home.js';
import Main from './components/Main.js';
import Quiz from './components/quiz/Quiz.js';
import QuizWelcomeScreen from './components/quiz/QuizWelcomeScreen.js';

import Import1 from './components/imports/Import1.js';


class App extends Component {
  render() {
		const uid = getUID();
		if (!uid) {
			return (<Home />);
		}

		return (
			<Router>
				<div>
					<NavMulti />
					<Route exact={true} path="/" component={Main} />
					<Route exact={true} path="/quiz" component={Quiz} />
					<Route exact={true} path="/quiz/:id" component={QuizWelcomeScreen} />
					<Route exact={true} path="/admin/import1" component={Import1} />
					</div>
			</Router>
		);
  }
}

const mapStateToProps = (state) => {
	return {
		authReducer: state.AuthReducer
	}
};

export default connect(mapStateToProps)(App);
