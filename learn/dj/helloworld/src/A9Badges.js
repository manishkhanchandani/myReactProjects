import React, {Component} from 'react';

class A9Badges extends Component {
	render() {
		return (
			<div>
               
            <div className="page-header">
        <h1>Badges</h1>
      </div>
      <p>
        <a href="#">Inbox <span className="badge">42</span></a>
      </p>
      <ul className="nav nav-pills" role="tablist">
        <li role="presentation" className="active"><a href="#">Home <span className="badge">42</span></a></li>
        <li role="presentation"><a href="#">Profile</a></li>
        <li role="presentation"><a href="#">Messages <span className="badge">3</span></a></li>
      </ul>

            
            </div>
		);	
	}
}

export default A9Badges;