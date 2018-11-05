import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import SMap from './Baidu/Static_01.js';
//import SMap from './Baidu/Async_02.js';
//import SMap from './Baidu/Events_03.js';

import Baidu from './components/Baidu.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
		<Baidu />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
