import React, { Component } from 'react';
import MyFlixLayout from './MyFlix/MyFlixLayout.js';
import OnlineRxLayout from './Layouts/OnlineRxLayout.js';
import {config} from './common/config.js';
class App extends Component {
  render() {
	  let layout = '';
	  const site = config.site;
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