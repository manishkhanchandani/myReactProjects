import React, { Component } from 'react';

import MyFlixLayout from './Layouts/MyFlixLayout.js';
import OnlineRxLayout from './Layouts/OnlineRxLayout.js';

class App extends Component {
  render() {
	  let layout = '';
	  const site = 'myflix.info';
	  if (site === 'myflix.info') {
		  layout = (<MyFlixLayout />);
	  } else if (site === 'onlinerx.info') {
		  layout = (<OnlineRxLayout />);
	  }
	  
    return (
      <div>
        {layout}
      </div>
    );
  }
}

export default App;
