import React, {Component} from 'react';
import {connect} from 'react-redux';
import Results from './Results.js';

import {distance, processRecords} from '../../../utilities/functions.js';
import Paginator from '../../../utilities/Paginator.js';

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

		const {myArrayConverted, paginationProps} = processRecords(myArray, this.state.sortingField, this.state.filterTerm, ['title', 'description', 'tags'], 20, this.state.pageNumber, this.onActivePageChange.bind(this));
		
		var distanceOption = [];
		distanceOption.push(<option key="3" value="">Select Sorting Order</option>);
		if (this.props.foodReducer.location.lat && this.props.foodReducer.location.lng) {
				distanceOption.push(<option key="1" value="distance">Distance Ascending</option>);
				distanceOption.push(<option key="2" value="-distance">Distance Descending</option>);
		}
		
		var uid = localStorage.getItem('userId');
		
		
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<input type="text" placeholder="Filter" className="form-control" onChange={(e) => {this.setState({filterTerm: e.target.value, pageNumber: 1});}} />
					</div>
					<div className="col-md-6">
						<select className="form-control" onChange={(e) => {this.setState({sortingField: e.target.value, pageNumber: 1});}}>
							{distanceOption}
							<option value="title">Title Ascending</option>
							<option value="-title">Title Descending</option>
							<option value="created_dt">Created Date Ascending</option>
							<option value="-created_dt">Created Date Descending</option>
						</select>
					</div>
				</div>
				<br />
				<div className="row">
				{
					myArrayConverted.map((value, index) => {
						return	<Results record={value} key={index} fromUid={uid}  /> 			 
					})	
				}
				</div>
				
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