import React, {Component} from 'react';
import {connect} from 'react-redux';
import Results from './Results.js';

import {distance} from '../utilities/functions.js';

class ResultContainer extends Component {
	render() {
		console.log('props are ', this.props);
		if (!this.props.data) {
			return null;	
		}
		var myArray = [];
		//37.773972, -122.431297
		for (var key in this.props.data) {
			if (this.props.foodReducer.location.lat && this.props.foodReducer.location.lng) {
				var dist = distance(this.props.foodReducer.location.lat, this.props.foodReducer.location.lng, this.props.data[key].location.lat, this.props.data[key].location.lng);
				this.props.data[key].distance = dist.toFixed(2);
			}
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


const mapStateToProps = (state) => {
	return {
		foodReducer: state.FoodDonationReducer
	}	
};

export default connect(mapStateToProps)(ResultContainer);