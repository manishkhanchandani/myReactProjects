import React, {Component} from 'react';
import {connect} from 'react-redux';
import Results from './Results.js';

import {distance} from '../utilities/functions.js';
import Paginator from '../utilities/Paginator.js';

class ResultContainer extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 1	
		}
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
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
		
		const maxRows = 3;
		const pageNum = this.state.pageNumber - 1;
		const startRow = pageNum * maxRows;
		const totalRows = myArray.length;
		const totalPages = Math.ceil(totalRows/maxRows);
		const myArrayConverted = myArray.splice(startRow, maxRows);
		
		//pagination component
		const paginationProps = {
		  activePage: this.state.pageNumber,
		  items: totalPages,//number of pages
		  onSelect: this.onActivePageChange.bind(this),
		  maxButtons: 3, //numer of buttons to display
		  boundaryLinks: true,
		  first: true,
		  last: true,
		  next: true,
		  prev: true
		}
		
		
		return (
			<div>				
				{
					myArrayConverted.map((value, index) => {
						return	<Results record={value} key={index}  /> 			 
					})	
				}
				
				<hr />
				<Paginator {...paginationProps} />
				
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