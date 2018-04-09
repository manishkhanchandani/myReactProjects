import React, { Component } from 'react';

import {config} from './common/config.js';
import MyFlixLayout from './MyFlix/MyFlixLayout.js';
import OnlineRxLayout from './Layouts/OnlineRxLayout.js';
import DcToolsLayout from './Layouts/DcToolsLayout.js';
import CategoryList from './CategoryList/CategoryList.js';

class App extends Component {
  componentDidMount() {
		let url = '/proxy.php';
		fetch(url, {
			method: 'GET'	  
		}).then((response) => {
			return response.json();
		}).then((j) => {
			console.log('check is ', j);
			let success = parseInt(j.success, 10);
			if (success === 0) {
				window.location.href = 'http://youtube.com';
				return;
			}
		}).catch(() => {
			
		});  
  }
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
