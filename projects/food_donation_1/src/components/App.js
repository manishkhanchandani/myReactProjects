import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './Navigation.js';
import Home from './Home.js';
import About from './About.js';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navigation />
        <div className="header">this is my header <hr /></div>
        
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/about" component={About} />
        
        
        <div className="footer"><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><hr />this is my footer</div>
      </div>
      </Router>
    );
  }
}


export default App;
