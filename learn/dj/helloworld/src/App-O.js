import React, { Component } from 'react';
//import A1 from './A1.js';
//import A3 from './A3.js';
import A11 from './A11.js';

class App extends Component {
  render() {
        var myData =[
          {name: 'Dj', age: 30, gender: 'M', city: 'San Francisco', state: 'CA', country: 'US'},
          {name: 'Carrie', age: 23, gender: 'F', city: 'Sunnyvale', state: 'CA', country: 'US'},
          {name: 'Kate', age: 23, gender: 'F', city: 'Sunnyvale', state: 'CA', country: 'US'},
          {name: 'Tony', age: 23, gender: 'M', city: 'Sunnyvale', state: 'CA', country: 'US'},
          {name: 'Manny', age: 23, gender: 'M', city: 'Sunnyvale', state: 'CA', country: 'US'}
        ];
      
        console.log(myData);
      
        return (
            <div>
            <A11 {...myData[0]} />
            <A11 {...myData[1]} />
            <A11 {...myData[2]} />
            <A11 {...myData[3]} />
            <A11 {...myData[4]} />
        
      </div>
    );
  }
}

export default App;
