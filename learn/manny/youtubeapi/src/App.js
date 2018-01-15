import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import searchYouTube from 'youtube-api-search';
const API_KEY = 'AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk';

class App extends Component {
	
	componentDidMount() {
		let term = 'b4QX4NVr4i4';
		searchYouTube({key: API_KEY, term: term, maxResults: 1}, (videos) => {
            console.log('videos: ', videos);
        });		
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
