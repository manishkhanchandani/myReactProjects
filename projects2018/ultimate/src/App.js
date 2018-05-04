import React, { Component } from 'react';

import {config} from './common/config.js';
import MyFlixLayout from './MyFlix/MyFlixLayout.js';
import OnlineRxLayout from './Layouts/OnlineRxLayout.js';
import DcToolsLayout from './Layouts/DcToolsLayout.js';
import CategoryList from './CategoryList/CategoryList.js';
import HomrxLayout from './homrx/HomrxLayout.js';

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
	  console.log('site is ', site);
	  if (site === 'homrx.mkgalaxy.com' || site === 'localhost') {
		  console.log('hereee');
		  layout = (<HomrxLayout />);
	  } else if (site === 'onlinerx.info') {
		  layout = (<OnlineRxLayout />);
	  } else if (site === 'categorylist.us') {
		layout = (<CategoryList />);  
	  } else if (site === 'dctools.info') {
		layout = (<DcToolsLayout />);
	  } else if (site === 'myflix.info') {
		  layout = (<MyFlixLayout />);
	  }

    return (
      <div>
        {layout}
      </div>
    );
  }
}

export default App;
