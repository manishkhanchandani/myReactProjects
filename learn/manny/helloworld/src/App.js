import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 

import Home from './project2/Home.js';
import About from './project2/About.js';
import Contact from './project2/Contact.js';
import Listing from './project2/Listing.js';
import Detail from './project2/Detail.js';
import Results from './project2/Results.js';


class App extends Component {
  render() {
    return (
		<Router>
		  <div>
		  	<h1>Header</h1>
			<p><Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link></p>
			<hr />
			
			
			<Route exact={true} path="/" component={Home} />
			<Route exact={true} path="/about" component={About} />
			<Route exact={true} path="/contact" component={Contact} />
			<Route exact={true} path="/listing" component={Listing} />
			<Route exact={true} path="/detail/:id/:title" component={Detail} />
			<Route exact={true} path="/results/:lat/:lng/:city/:state/:country/:county/:location/:keyword" component={Results} />
			<Route exact={true} path="/results/:lat/:lng/:city/:state/:country/:county/:location" component={Results} />
			
			
			
			
			
			<hr />
			<h1>Footer</h1>
		  </div>
		</Router>
    );
  }
}

export default App;

















