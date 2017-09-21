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
			{ myData.map((data,index)=>{
						  
						  return <A11 key={index} {...data}/>
						 
						  })			
			}
	  
      </div>
    );
  }
}

export default App;
