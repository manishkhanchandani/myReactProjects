import React, { Component } from 'react';
import A11 from './A11.js';

class App extends Component {
  render() {
      var myData = [
        {name: 'kate', age: 23},
        {name: 'carrie', age: 24},
        {name: 'manny', age: 43},
        {name: 'tony', age: 28},
        {name: 'dj', age: 26}
      ];

    return (
      <div>
        <A11 {...myData[0]}  />
        <A11 {...myData[1]}  />
        <A11 {...myData[2]}  />
        <A11 {...myData[3]}  />
        <A11 {...myData[4]}  />
      </div>
    );
  }
}

export default App;
