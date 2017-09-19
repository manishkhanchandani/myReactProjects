import React, { Component } from 'react';
import A4 from './A4.js';
import A5btn from './A5btn.js';
import './A3.css';

class A3 extends Component {
  render() {
    return (
        <div>
              <div className="container theme-showcase" role="main">
			  <A4/>
			  <A5btn/>
			  </div>
      </div>
    );
  }
}

export default A3;
