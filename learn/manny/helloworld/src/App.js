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
            <nav className="navbar navbar-default navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">Project name</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav">
                    <li className="active"><a href="#">Home</a></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><Link to="/listing">Listing</Link></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" className="divider"></li>
                        <li className="dropdown-header">Nav header</li>
                        <li><a href="#">Separated link</a></li>
                        <li><a href="#">One more separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="../navbar/">Default</a></li>
                    <li className="active"><a href="./">Static top <span className="sr-only">(current)</span></a></li>
                    <li><a href="../navbar-fixed-top/">Fixed top</a></li>
                  </ul>
                </div>
              </div>
            </nav>
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

















