import React, {Component} from 'react';
import Results from './Results.js';


class ResultsContainer extends Component {

	
	render() {
		if (!this.props.data) {
			return null;	
		}
		

		return (
			<div className="row">
				{ this.props.data.map((value, key) => {
						return <div className="col-md-6"  key={key}><Results data={value} /></div>
					})
				}
			</div>
		);
	}
}

export default ResultsContainer;