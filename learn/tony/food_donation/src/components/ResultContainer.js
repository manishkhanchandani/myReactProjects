import React, {Component} from 'react';

import Results from './Results.js';

import {distance} from '../utilities/functions.js';

class ResultContainer extends Component {
	render() {
		if (!this.props.data) {
			return null;	
		}
		var myArray = [];
		//37.773972, -122.431297
		for (var key in this.props.data) {
			var dist = distance(37.702152, -121.935791, this.props.data[key].location.lat, this.props.data[key].location.lng);
			this.props.data[key].distance = dist.toFixed(2);
			myArray.push(this.props.data[key]);
		}
		return (
			<div>				
				{
					myArray.map((value, index) => {
						return	<Results record={value} key={index}  /> 			 
					})	
				}
				
			</div>
		);
	}
}

export default ResultContainer;