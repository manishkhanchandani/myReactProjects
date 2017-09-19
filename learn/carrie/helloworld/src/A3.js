import React, { Component } from 'react';

import A4_Jumbotron from './A4_Jumbotron.js';
import A5_Buttons from './A5_Buttons.js';
import A6_Tables from './A6_Tables.js';
import A7_Thumbnails from './A7_Thumbnails.js';
import A8_Labels from './A8_Labels.js';
import A9_Badges from './A9_Badges.js';
import A10_DropdownMenus from './A10_DropdownMenus.js';
import A11_Navs from './A11_Navs.js';
import A12_Navbars from './A12_Navbars.js';
import A13_Alerts from './A13_Alerts.js';
import A14_ProgressBars from './A14_ProgressBars.js';
import A15_ListGroups from './A15_ListGroups.js';
import A16_Panels from './A16_Panels.js';
import A17_Wells from './A17_Wells.js';
import A18_Carousel from './A18_Carousel.js';

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
