import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './Home.js';
import Main from './Main.js';

class App extends Component {
  render() {
    return (
			<Router basename={'/project2017/law/tw'}>
			  <div className="App">
				<header className="App-header">
				  <img src={logo} className="App-logo" alt="logo" />
				  <h1 className="App-title">Welcome to React</h1>
				  <div>
				  <Link to={`${process.env.PUBLIC_URL}/`}>Main</Link> | <Link to={`${process.env.PUBLIC_URL}/home`}>Home</Link>
				  </div>
				</header>
				<div className="App-intro">
					<Route exact={true} path={`${process.env.PUBLIC_URL}/`} component={Main} />
					<Route exact={true} path={`${process.env.PUBLIC_URL}/home`} component={Home} />
				</div>
			  </div>
			</Router>
    );
  }
}

export default App;
