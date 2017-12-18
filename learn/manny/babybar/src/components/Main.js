import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Main extends Component {
	render() {
		return (
			<div className="container">
				<h3>California Baby Bar Preparation, Quizes, MBE Practice, Essay Practice</h3>
				<p>More Fun and Practice - coming soon...</p>
				
				
				<h3><Link to="/quiz">Quiz Page</Link></h3>
			</div>
		);
	}
}

export default Main;