import React, { Component } from 'react';

import {config} from './common/config.js';
import MyFlixLayout from './Layouts/MyFlixLayout.js';
import OnlineRxLayout from './Layouts/OnlineRxLayout.js';
import DcToolsLayout from './Layouts/DcToolsLayout.js';

class App extends Component {
  render() {
	  let layout = '';
	  const site = config.site;
	  if (site === 'myflix.info') {
		  layout = (<MyFlixLayout />);
	  } else if (site === 'onlinerx.info') {
		  layout = (<OnlineRxLayout />);
	  } else if (site === 'dctools.info') {
		  layout = (<DcToolsLayout />);
		}

    return (
      <div>
        {layout}
      </div>
    );
  }
}

export default App;
