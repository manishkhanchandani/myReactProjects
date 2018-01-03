import React, {Component} from 'react';
import {connect} from 'react-redux';
import Results from './Results.js';

import {distance, processRecords} from '../../../utilities/functions.js';
import Paginator from '../../../utilities/Paginator.js';

import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.centerLat, lng: props.centerLng }}
  >
    {props.isMarkerShown && 
		props.myArray.map((value, key) => {
			var pos = { lat: value.location.lat, lng: value.location.lng };
			return <Marker key={key} position={pos} onClick={() => props.onMarkerClick(value)} />			   
		})
	}
  </GoogleMap>
);


class ResultContainer extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 1,
			filterTerm: null,
			sortingField: null,
			isMarkerShown: false,
		}
	}
	
	componentDidMount() {
		this.delayedShowMarker()
	}
	
	delayedShowMarker() {
		setTimeout(() => {
		  this.setState({ isMarkerShown: true })
		}, 3000)
	}
	
	handleMarkerClick(val) {
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
		
		var centerLat = myArrayConverted[0].location.lat;
		var centerLng = myArrayConverted[0].location.lng;
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
					<div className="col-md-6">
						<div className="row resultsContainer">
						{
							myArrayConverted.map((value, index) => {
								return	<Results record={value} key={index} fromUid={uid}  /> 			 
							})	
						}
						</div>
					</div>
					<div className="col-md-6">
						<MyMapComponent
							isMarkerShown={this.state.isMarkerShown}
							onMarkerClick={this.handleMarkerClick.bind(this)}
							centerLat={centerLat}
							centerLng={centerLng}
							myArray={myArray}
						  />
					</div>
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