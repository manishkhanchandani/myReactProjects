import React, { Component } from 'react';

import A4Jumbotron from './A4Jumbotron.js';
import A5Buttons from './A5Buttons.js';
import A6Tables from './A6Tables.js';
import A7Thumbnails from './A7Thumbnails.js';
import A8Labels from './A8Labels.js';
import A9Badges from './A9Badges.js';
import A10DropdownMenus from './A10DropdownMenus.js';
import A11Navs from './A11Navs.js';
import A12Navbars from './A12Navbars.js';
import A13Alerts from './A13Alerts.js';
import A14ProgressBars from './A14ProgressBars.js';
import A15ListGroups from './A15ListGroups.js';
import A16Panels from './A16Panels.js';
import A17Wells from './A17Wells.js';
import A18Carousel from './A18Carousel.js';

import './A3.css';

class A3 extends Component {
  render() {
    return (
      <div className="container theme-showcase" role="main">
	  	<A4Jumbotron />
	  	<A5Buttons />
	  	<A6Tables />
	  	<A7Thumbnails />
	  	<A8Labels />
	  	<A9Badges />
	  	<A10DropdownMenus />
	  	<A11Navs />
	  	<A12Navbars />
	  	<A13Alerts />
	  	<A14ProgressBars />
	  	<A15ListGroups />
	  	<A16Panels />
	  	<A17Wells />
	  	<A18Carousel />
	  </div>
    );
  }
}

export default A3;
