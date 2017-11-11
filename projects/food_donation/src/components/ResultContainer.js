import React, {Component} from 'react';
import {connect} from 'react-redux';
import Results from './Results.js';

import {distance} from '../utilities/functions.js';
import Paginator from '../utilities/Paginator.js';

class ResultContainer extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 1,
			filterTerm: null,
			sortingField: null
		}
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	dynamicSort(property) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}
	
	render() {
		console.log('props are ', this.props);
		console.log('state are ', this.state);
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
		
		//FILTER RESULTS
		if (this.state.filterTerm) {
			myArray = myArray.filter((record) => {
				if (!record.title) record.title = '';
				if (!record.description) record.description = '';
				if (!record.location.administrative_area_level_1) record.location.administrative_area_level_1 = '';
				if (!record.location.administrative_area_level_2) record.location.administrative_area_level_2 = '';
				if (!record.location.country) record.location.country = '';
				if (!record.location.formatted_address) record.location.formatted_address = '';
				if (!record.location.locality) record.location.locality = '';
				if (!record.id) record.id = '';
				return (record.title.toLowerCase().indexOf(this.state.filterTerm.toLowerCase())	>= 0 || record.description.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) >= 0 || record.tags.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) >= 0 || record.location.administrative_area_level_1.toLowerCase().indexOf(this.state.filterTerm.toLowerCase())	>= 0 || record.location.administrative_area_level_2.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) >= 0 || record.location.country.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) >= 0 || record.location.formatted_address.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) >= 0 || record.location.locality.toLowerCase().indexOf(this.state.filterTerm.toLowerCase())	>= 0 || record.id.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) >= 0);  
				
			});	
		}		
		
		//SORTING RESULTS
		if (this.state.sortingField) {
			myArray.sort(this.dynamicSort(this.state.sortingField));	
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
				<div className="row">
					<div className="col-md-6">
						<input type="text" placeholder="Filter" className="form-control" onChange={(e) => {this.setState({filterTerm: e.target.value, pageNumber: 1});}} />
					</div>
					<div className="col-md-6">
						<input type="text" placeholder="Sorting" className="form-control" onChange={(e) => {this.setState({sortingField: e.target.value, pageNumber: 1});}} />
					</div>
				</div>
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