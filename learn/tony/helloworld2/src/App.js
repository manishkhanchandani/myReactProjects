import React, { Component } from 'react';
// This import will add our A?.js files to this file
import A1 from './A1.js';
import A2 from './A2.js';
import A3 from './A3.js';
import A4 from './A4.js';
import A5 from './A5.js';

class App extends Component {
  render() {
    return (
      <div>
        hello world
        
        <A1 /> 
        <A2 /> 
        <A3 /> 
        <A4 /> 
        <A5 /> 
      </div>
    );
  }
}

export default App;
