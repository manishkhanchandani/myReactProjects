import React, { Component } from 'react';
import Navigation from './project1/Navigation.js';
import Container from './project1/Container.js';
import './A2.css';

class App extends Component {
  render() {
    return (
      <div>
           <Navigation />
           <Container />
      </div>
    );
  }
}

export default App;
