import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import {viewData, saveSearchInfo} from '../actions/FoodAction.js';

import {distance} from '../utilities/functions.js';

import Comments from './Comments/Comments.js';

class Home extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			keyword: '',
			location: null,
			boundary: 'county',
			data: []
		};
	}
	
	processRecords(key) {
		var url = FirebaseConstant.basePath + '/data/posts/' + key;
		var ref = firebaseDatabase.ref(url);

		var tmp = this.state.data;
		ref.once('value', (snapshot) => {
			var record = snapshot.val();
			record.id = key;
			if (this.state.location && this.state.location.lat && this.state.location.lng) {
				record.distance = distance(this.state.location.lat, this.state.location.lng, record.location.lat, record.location.lng).toFixed(2);
			}
			tmp.push(record);
			this.setState({data: tmp});
			this.props.callViewData(this.state.data);
		});
		
	}
	
	refreshData()
	{
		var url = '';
		var ref = '';
		if (this.state.keyword && this.state.location) {
			url = `${FirebaseConstant.basePath}/data/tags/${this.state.keyword}/county/${this.state.location.country}/${this.state.location.administrative_area_level_1}/${this.state.location.administrative_area_level_2}`;

			ref = firebaseDatabase.ref(url).limitToLast(500);
			ref.on('value', (snapshot) => {
				var records = snapshot.val();
				for (var key in records) {
					this.processRecords(key);
				}
			});
		} else if (this.state.keyword) {
			url = `${FirebaseConstant.basePath}/data/tags/${this.state.keyword}/all_tag_post`;
			ref = firebaseDatabase.ref(url).limitToLast(500);
			ref.on('value', (snapshot) => {
				var records = snapshot.val();
				console.log('records: ', records);
				for (var key in records) {
					this.processRecords(key);
				}
			});
		} else if (this.state.location) {
			url = `${FirebaseConstant.basePath}/data/county/${this.state.location.country}/${this.state.location.administrative_area_level_1}/${this.state.location.administrative_area_level_2}`;
			console.log(url);
			ref = firebaseDatabase.ref(url).limitToLast(500);
			ref.on('value', (snapshot) => {
				var records = snapshot.val();
				for (var key in records) {
					this.processRecords(key);
				}
			});
		} else {
			url = FirebaseConstant.basePath + '/data/posts';
			ref = firebaseDatabase.ref(url).limitToLast(500);
			ref.on('value', (snapshot) => {
				//getting results from the firebase
				var records = snapshot.val();
				//converting object to array
				var myArray = [];
				for (let key in records) {
					var record = records[key];
					record.id = key;
					if (this.state.location && this.state.location.lat && this.state.location.lng) {
						record.distance = distance(this.state.location.lat, this.state.location.lng, record.location.lat, record.location.lng).toFixed(2);
					}
					myArray.push(record);
				}
				
				this.props.callViewData(myArray);
			});
		}		
	}

	getDataFromFB() {
		console.log('props are: ', this.props);
		
		this.setState({data: []}, () => {
			this.props.callViewData(this.state.data);
			this.refreshData();	   
		});
		
		
		

		
		
	}
	
	componentDidMount() {
		this.getDataFromFB();	
	}

	frmSub(e) {
		e.preventDefault();
		this.getDataFromFB();
	}

	render() {
		console.log('state is ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>Search Food Donation</h3>
						<form onSubmit={this.frmSub.bind(this)}>
						  <div className="form-group">
							<label>Keyword</label>
							<input type="text" className="form-control" id="keyword" placeholder="Enter Keyword" value={this.state.keyword} onChange={(e) => {this.setState({keyword: e.target.value})}} />
						  </div>
						  <div className="form-group">
							<label>Your Home/Work Location (*)</label>
							<Autocomplete className="form-control addressBox" onPlaceSelected={(place) => {
								console.log(place); 
								if (!place.formatted_address) {
									alert('please choose the address from drop down');
									return null;
								}
								
								var obj = {};
								obj.formatted_address = place.formatted_address;
								obj.lat = place.geometry.location.lat();
								obj.lng = place.geometry.location.lng();
								
								var componentForm = {
									locality: 'long_name',
									administrative_area_level_1: 'short_name',
									country: 'short_name',
									administrative_area_level_2: 'long_name'
								  };

								var addressType = null;
								for (var i = 0; i < place.address_components.length; i++) {
									addressType = place.address_components[i].types[0];
									if (componentForm[addressType]) {
										obj[addressType] = place.address_components[i][componentForm[addressType]];
									}
								}
								
								this.setState({location: obj});
							}}
							types={['geocode']}
							/>
						  </div>
						  <button type="submit" className="btn btn-primary form-control">Search</button>
						</form>
					</div>
					<div className="col-md-9">
						<h3>Search Results</h3>
							<div className="row">
						{
							this.props.food_reducer.data && 
								this.props.food_reducer.data.map((value, key) => {
									var detailsURL = '/details/' + value.id;
									return <div className="col-md-6" key={key}>
											<div className="media">
											  <div className="media-left">
												<a href="">
												  <img className="media-object myAccountImg" src={value.imageUrl} alt="..." />
												</a>
											  </div>
											  <div className="media-body">
												<h4 className="media-heading"><Link to={detailsURL}>{value.title}</Link></h4>
												<div>{value.description}</div>
												<div><a href="">Chat</a></div>
												{
													value.distance &&
													<div>{value.distance} miles</div>
												}
												
											  </div>
											</div>
									
										</div>
								})	
						}
						</div>
						
						
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		food_reducer: state.FoodReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callViewData: (obj) => {
			dispatch(viewData(obj));
		},
		callSaveSearchInfo: (obj) => {
			dispatch(saveSearchInfo(obj));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);