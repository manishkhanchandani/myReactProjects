import React, { Component } from 'react';
import A11 from './A11.js';

class App extends Component {
  render() {
	  var myData = [
		  {name:"kate", age:21},
		  {name:"carrie", age:22},
		  {name:"manny", age:43},
		  {name:"tony", age:30},
		  {name:"dj", age:28}
	
		  ];
	  
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
