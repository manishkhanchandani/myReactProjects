import React, {Component} from 'react';
import {connect} from 'react-redux';
import Results from './lists/template1/Results.js';

import {distance, processRecords} from '../utilities/functions.js';
import Paginator from '../utilities/Paginator.js';
import {Button, Modal} from 'react-bootstrap';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

class ResultContainer extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 1,
			filterTerm: null,
			sortingField: null,
			showModal: false,
			modalDetails: null
		}
	}
	
	deleteRecord(rec)
	{
		var user_id = localStorage.getItem('userId');
		if (user_id !== rec.user_id) {
			return false;	
		}

		var url = FirebaseConstant.basePath + '/data';
		var postUrl = url + '/posts/' + rec.id;
		firebaseDatabase.ref(postUrl).set(null);
		
		var country = rec.location.country;
		var state = rec.location.administrative_area_level_1;
		var county = rec.location.administrative_area_level_2;
		var city = rec.location.locality;
		
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/country').child(country).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/state').child(country).child(state).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/county').child(country).child(state).child(county).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/city').child(country).child(state).child(county).child(city).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/users').child(user_id).child(rec.id).set(null);
		
		var tags = rec.tags.split(',');
		
		if (tags.length > 0) {
			for (var i = 0; i < tags.length; i++) {
				var tag = tags[i].trim();
				
				var tagURL = FirebaseConstant.basePath + '/data/tags/' + tag;
				firebaseDatabase.ref(tagURL + '/country').child(country).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/state').child(country).child(state).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/county').child(country).child(state).child(county).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/city').child(country).child(state).child(county).child(city).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/all_tag_posts').child(rec.id).set(null);
			}
		}
		
		this.close();
	}
	
	changeShowModal(val, details, e) {
		e.preventDefault();
		this.setState({showModal: val, modalDetails: details});
	}
	
	close() {
		this.setState({showModal: false});
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
		
		console.log('STATE IS ', this.state);
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
				<div className="row resultsContainer">
				{
					myArrayConverted.map((value, index) => {
						return	<Results record={value} key={index} fromUid={uid} changeShowModal={this.changeShowModal.bind(this)}  /> 			 
					})	
				}
				</div>
				<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Delete Record For&nbsp;
						{
							this.state.modalDetails && 
								<span>
									{this.state.modalDetails.title}
								</span> 
						} </h4>
						<p>Do you really want to delete this record? You wont be able to recover it later?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.deleteRecord.bind(this, this.state.modalDetails)} >Delete Record</Button>
					</Modal.Footer>
				</Modal>
				
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