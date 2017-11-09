import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Nav from './components/Nav.js';
import Project1 from './components/Project1.js';

class App extends Component {
  render() {
    return (
	  <Router>
      <div>
	  	<Nav />
	
			
        <Route exact={true} path="/" component={Project1} />
		
		
      </div>
	  </Router>
    );
  }
}

export default App;
