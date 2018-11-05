import React, { Component } from 'react';

class Person extends Component {
    render() {
        const style = {
          backgroundColor: 'green',
          color: 'white',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer',
          width: '800px',
          ':hover': {
            backgroundColor: 'lightgreen',
            color: 'black'
          }
        }
    
        return (
          <div className="App">
            <header style={style}>
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        );
      }
}

export default Person;