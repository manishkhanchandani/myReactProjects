import React, {Component} from 'react';
import Results from './Results.js';
import {distance} from '../utilities/functions.js';

class ResultsContainer extends Component {
	render() {
		if (!this.props.data) {
			return null;	
		}
		
		var arr = [];
		for (var key in this.props.data) {
			var formattedData = this.props.data[key];
			var dist = distance(37.773972, -122.431297, formattedData.location.lat, formattedData.location.lng);
			formattedData.distance = dist.toFixed(2);
			arr.push(formattedData);
		}
		
		if (arr.length <= 0) {
			return null;	
		}
		
		return (
			<div className="row">
				{ arr.map((value, key) => {
						return <div className="col-md-6"  key={key}><Results data={value} /></div>
					})
				}
			</div>
		);
	}
}

export default ResultsContainer;