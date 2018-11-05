import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';

class NoPageFound extends Component {
	render() {
		return (
			<div>
				<Alert bsStyle="warning">
				Login first to see the contents
			  </Alert>
			</div>
		);
	}
}

export default NoPageFound;