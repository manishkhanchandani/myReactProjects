import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import asyncComponent from './AsyncComponent.js';
console.log('asyncComponent: ', asyncComponent);
const AsyncHome = asyncComponent(() => import("./Home.js"));
const AsyncAbout = asyncComponent(() => import("./About.js"));


class App extends Component {
  render() {
    return (
			<Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. <Link to="/home">Home</Link> | <Link to="/about">About</Link> | <Link to="/">App</Link>
        </p>

		
			<Switch>
			  <Route exact path="/home" component={AsyncHome}/>
			  <Route path="/about" component={AsyncAbout}/>
			</Switch>

      </div>
	  </Router>
    );
  }
}

export default App;
