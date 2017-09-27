import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from "./project2/Home.js";
import About from "./project2/About.js";
import Contact from "./project2/Contact.js";
import Listing from "./project2/Listing.js";
import Detail from "./project2/Detail.js";

// Example of how to add a style sheet to page
// import "./A3/css"; 

class App extends Component {
  render() {
    return (
     <Router>
        <div>
            <h1>Header</h1>
            <p><Link to="/">Home</Link> | <Link to="/About">About</Link> | <Link to="/Contact">Contact</Link> | <Link to="/Listing">Listing</Link></p>
            
            <hr />
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/about" component={About} />
              <Route exact={true} path="/contact" component={Contact} />
              <Route exact={true} path="/listing" component={Listing} />
              <Route exact={true} path="/detail/:id/:title" component={Detail} />
            <hr />
            
            <h1>Footer</h1>
        </div>
      </Router>
    );
  }
}

export default App;
