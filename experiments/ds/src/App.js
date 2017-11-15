import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import Home from './components/Home.js';
import Sample2 from './components/Sample2.js';

class App extends Component {
  render() {
    return (
	  <Router>
      <div>
		  	<Switch>
			  <Route path='/sample2' component={Sample2} />
			  <Route path='/' component={Home}/>
			</Switch>
      </div>
	  </Router>
    );
  }
}

export default App;
