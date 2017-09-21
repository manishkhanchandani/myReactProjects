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

      myData.map(() => {})
    return (
      <div>
        {
          myData.map((value, index) => {
            return <A11 key={index} {..value} />
          })
        }
      </div>
    );
  }
}

export default App;
