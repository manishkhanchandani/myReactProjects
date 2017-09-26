import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Home from './project2/Home.js';
import About from './project2/About.js';
import Contact from './project2/Contact.js';

class App extends Component {
  render() {
    return (
		<Router>
		  <div>
		  	<h1>Header</h1>
			<p><a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></p>
			<hr />
			
			<hr />
			<h1>Footer</h1>
		  </div>
		</Router>
    );
  }
}

export default App;

















