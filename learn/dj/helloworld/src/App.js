import React, { Component } from 'react';
//import A1 from './A1.js';
//import A3 from './A3.js';
import A11 from './A11.js';

class App extends Component {
  render() {
    return (
      <div >
        {/*<A1 /> <A3 />*/}
        
        <div >
		<A11 name="Kate" age="22" gender="Female" city="San Jose" state="" country="USA" />
		<A11 name="Carrie" age="23" gender="Female" city="Cupertino" state="" country="USA" />
		<A11 name="DJ" age="24" gender="Male" city="San Francisco" state="" country="USA"/>
		<A11 name="Tony" age="25" gender="Male" city="Sunnyvale" state="" country="USA"/>
      </div>
        
      </div>
    );
  }
}

export default App;
