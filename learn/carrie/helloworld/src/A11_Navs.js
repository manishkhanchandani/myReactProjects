import React, { Component } from 'react';

class A11_Navs extends Component {
  render() {
    return (
		<div>      
			<div className="page-header">
				<h1>Navs</h1>
			  </div>
			  <ul className="nav nav-tabs" role="tablist">
				<li role="presentation" className="active"><a href="#">Home</a></li>
				<li role="presentation"><a href="#">Profile</a></li>
				<li role="presentation"><a href="#">Messages</a></li>
			  </ul>
			  <ul className="nav nav-pills" role="tablist">
				<li role="presentation" className="active"><a href="#">Home</a></li>
				<li role="presentation"><a href="#">Profile</a></li>
				<li role="presentation"><a href="#">Messages</a></li>
			  </ul>
		</div>
    );
  }
}

export default A11Navs;
