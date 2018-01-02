import React, { Component } from 'react';

import MyflixLayout from './layouts/MyflixLayout.js';
import HomRxLayout from './layouts/HomRxLayout.js';

class App extends Component {
  render() {
	  let layout = '';
	  const site = 1;
	  if (site === 1) {
		  layout = <MyflixLayout />
	  } else if (site === 2) {
		  layout = <HomRxLayout />
	  }
    return (
      <div>
	  	{layout}
      </div>
    );
  }
}

export default App;
