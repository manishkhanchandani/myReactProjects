import React, { Component } from 'react';

import A4_Jumbotron from './A4Jumbotron.js';
import A5_Buttons from './A5Buttons.js';
import A6_Tables from './A6Tables.js';
import A7_Thumbnails from './A7Thumbnails.js';
import A8_Labels from './A8Labels.js';
import A9_Badges from './A9Badges.js';
import A10_DropdownMenus from './A10DropdownMenus.js';
import A11_Navs from './A11Navs.js';
import A12_Navbars from './A12Navbars.js';
import A13_Alerts from './A13Alerts.js';
import A14_ProgressBars from './A14ProgressBars.js';
import A15_ListGroups from './A15ListGroups.js';
import A16_Panels from './A16Panels.js';
import A17_Wells from './A17Wells.js';
import A18_Carousel from './A18Carousel.js';

import './A3.css';

class A3 extends Component {
  render() {
    return (
      <div className="container theme-showcase" role="main">
	  	<A4_Jumbotron />
	  	<A5_Buttons />
	  	<A6_Tables />
	  	<A7_Thumbnails />
	  	<A8_Labels />
	  	<A9_Badges />
	  	<A10_DropdownMenus />
	  	<A11_Navs />
	  	<A12_Navbars />
	  	<A13_Alerts />
	  	<A14_ProgressBars />
	  	<A15_ListGroups />
	  	<A16_Panels />
	  	<A17_Wells />
	  	<A18_Carousel />
	  </div>
    );
  }
}

export default A3;
