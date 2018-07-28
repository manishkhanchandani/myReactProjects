import React, { Component } from 'react';
import Loadable from 'react-loadable';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//https://reactjs.org/docs/code-splitting.html
//https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#analyzing-the-bundle-size

const Loading = () => <div>Loading...</div>;
const ModuleA = Loadable({
  loader: () => import('./moduleA.js'),
  loading: Loading,
});

const ModuleB = Loadable({
  loader: () => import('./moduleB.js'),
  loading: Loading,
});

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			m1: null	
		};
	}

	handleClick() {
		import('./moduleA.js')
	  		.then((ModuleA) => {
				// Use ModuleA
				console.log('ModuleA is loaded: ', ModuleA);
	  		})
	  	.catch(err => {
			// Handle failure
			console.log('err is ', err);
	  	});
	}
  render() {
	  console.log('state is ', this.state);
    return (
			<Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
			<button onClick={this.handleClick.bind(this)}>Load</button>
			
			<br />
			<br />
			
			<Switch>
			  <Route exact path="/" component={ModuleA}/>
			  <Route path="/about" component={ModuleB}/>
			</Switch>
        </div>
      </div>
		  </Router>
    );
  }
}

export default App;
