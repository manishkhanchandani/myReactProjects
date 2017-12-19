import React, { Component } from 'react';
import NavMulti from './modules/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import SimpleQuiz from './modules/simple-quiz/SimpleQuiz.js';

class App extends Component {
  render() {
    return (
		<Router>
			<div >
				<NavMulti />
				{/*<Route exact={true} path="/" component={Main} />*/}
				<Route exact={true} path="/simpleQuiz" component={SimpleQuiz} />
				
			</div>
		</Router>
    );
  }
}

export default App;
