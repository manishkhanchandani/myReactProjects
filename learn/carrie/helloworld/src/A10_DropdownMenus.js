import React, { Component } from 'react';

class A10_DropdownMenus extends Component {
  render() {
    return (
		<div>      
			<div className="page-header">
				<h1>Dropdown menus</h1>
			  </div>
			  <div className="dropdown theme-dropdown clearfix">
				<a id="dropdownMenu1" href="#" className="sr-only dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
				  <li className="active"><a href="#">Action</a></li>
				  <li><a href="#">Another action</a></li>
				  <li><a href="#">Something else here</a></li>
				  <li role="separator" className="divider"></li>
				  <li><a href="#">Separated link</a></li>
				</ul>
		  </div>
		</div>
    );
  }
}

export default A10DropdownMenus;
