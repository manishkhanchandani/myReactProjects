import React, { Component } from 'react';

import {config} from './common/config.js';
import MyFlixLayout from './MyFlix/MyFlixLayout.js';
import OnlineRxLayout from './Layouts/OnlineRxLayout.js';
import DcToolsLayout from './Layouts/DcToolsLayout.js';
import CategoryList from './CategoryList/CategoryList.js';

class App extends Component {
  render() {
	  let layout = '';
	  const site = config.site;
	  if (site === 'myflix.info') {
		  layout = (<MyFlixLayout />);
	  } else if (site === 'onlinerx.info') {
		  layout = (<OnlineRxLayout />);
	  } else if (site === 'categorylist.us' || site === 'localhost') {
		layout = (<CategoryList />);  
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
