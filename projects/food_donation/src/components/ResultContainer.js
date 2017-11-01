import React, {Component} from 'react';

import Results from './Results.js';

class ResultContainer extends Component {
	render() {
		console.log('previous page data is ', this.props.data);
		//here i will write some code to convert object to array
		
		//list of items (object)
		return (
			<div>
				{/* loop through the list and for each list i will call Results component with that row */}
				<Results />
				<Results />
				<Results />
			</div>
		);
	}
}

export default ResultContainer;