import React, { Component } from 'react';
import A11 from './A11.js';

class App extends Component {
  render() {
    return (
      <div>
	
	     <A11 name="kate" age="20" gender="female" country="us" city="fremont"/>
		 <A11 name="carrie" age="18" gender="female" country="us" city="fremont"/>
		 <A11 name="dj" age="23" gender="male" country="us" city="fremont"/>
		 <A11 name="tony" age="19" gender="male" country="us" city="fremont"/>
		 
      </div>
    );
  }
}

export default App;
