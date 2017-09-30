import React, { Component } from 'react';
import A11 from './A11.js';

class App extends Component {
  render() {
	  var myData = [
				{name: 'kate1', age: 31},
				{name: 'carrie2', age: 32},
				{name: 'manny3', age: 33},
				{name: 'tony4', age: 35},
				{name: 'dj5', age: 34}
		];
	  
	 console.log(myData);
	 
    return (
      <div>
            {
                myData.map((value, index) => {
                    return <A11 key={index} {...value} />
                })
            }
      </div>
    );
  }
}

export default App;