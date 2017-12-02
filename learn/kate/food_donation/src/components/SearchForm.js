import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {connect} from 'react-redux';

import {browseFoodDonation, updateKeyword, updateLocation, updateBoundary} from '../actions/FoodDonationAction.js';
class SearchForm extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
				keyword: '',
				location: {
							formatted_address: "",
							administrative_area_level_1: "",
							administrative_area_level_2: "",
							country: "",
							lat: null,
							lng: null,
							locality: ""},
            	boundary: 'county',
				subObjects: {}
		};
	}
	
	componentDidMount() {
		// when page load
		
		this.getRecordsFromFB();
	}
	
	
	processLoop(key)
	{
		var subURL = FirebaseConstant.basePath + '/data/posts/'+key;
		var subRef = firebaseDatabase.ref(subURL);
		var tmp = this.state.subObjects;
		subRef.once('value', (subSnapshot) => {
			tmp[key] = subSnapshot.val();	
			this.setState({subObjects: tmp});
			
			this.props.func2(this.state.subObjects);
		});
	}
	
	getRecordsFromFB()
	{
		this.setState({subObjects: {}});	
		//grab the information from local storage
		//and pass to func3, 4 and 5 for keyword, location and boundary respectively
		
		
		var str = localStorage.getItem('formSearchData');
		var obj = JSON.parse(str);
		console.log('object is ', obj);
		if (obj) {  
			console.log('localstorage in action');
			//get data from localStorage and pass it to redux
			if (obj.keyword) {
				this.props.func3(obj.keyword);
			}						
			if (obj.location) {
				this.props.func4(obj.location);
			}			
			if (obj.boundary) {
				this.props.func5(obj.boundary);
			}
		} else {
			console.log('reducer in action');
			obj = this.props.foodReducer;
		}
		
		
		
		var url = FirebaseConstant.basePath + '/data';
		if (obj.keyword && obj.location.lat && obj.location.lng) {
			//do something
			if (obj.boundary === 'county') {
				url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2;
			} else if (obj.boundary === 'city') {
				url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2 + '/' + obj.location.locality;
			} else if (obj.boundary === 'state') {
				url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1;
			} else if (obj.boundary === 'country') {
				url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country;
			}
			
		} else if (obj.location.lat && obj.location.lng) {
			//do something
			if (obj.boundary === 'county') {
				url = url + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2;
			} else if (obj.boundary === 'city') {
				url = url + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2 + '/' + obj.location.locality;
			} else if (obj.boundary === 'state') {
				url = url + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1;
			} else if (obj.boundary === 'country') {
				url = url + '/' + obj.boundary + '/' + obj.location.country;
			}
		} else if (obj.keyword) {
			//do something
			url = url + '/tags/' + obj.keyword + '/all_tag_posts';
		} else {
			//home page will go here
			this.props.func1();
			return;
		}
		
		console.log('url is ', url);
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			var records = snapshot.val();
			if (!records) {
				this.props.func2(this.state.subObjects);
				return null;
			}
			
			for (var key in records) {
				this.processLoop(key);
			}
		});
	}
	 saveLocalStorage() {
		//save the information in the localStorage	
		var obj = {};
		obj.boundary = this.props.foodReducer.boundary;
		obj.keyword = this.props.foodReducer.keyword;
		obj.location = this.props.foodReducer.location;
		localStorage.setItem('formSearchData', JSON.stringify(obj));
		
	}
	searchRecords(e) {
		e.preventDefault();//this will stop the form submission
		this.saveLocalStorage();
		this.getRecordsFromFB();
	}

	render() {
		return (
			<div>
				<h3>Search</h3>
				<form onSubmit={this.searchRecords.bind(this)}>
				  <div className="form-group">
					<label>Keyword:</label>
					<input type="text" className="form-control" placeholder="Enter any Keyword" value={this.props.foodReducer.keyword} onChange={(e) => { this.props.func3(e.target.value); }} />
				  </div>
				  
				  <label>Location:</label>
				  <Autocomplete className="form-control addressBox" onPlaceSelected={(place) => {
					  
						if (!place.formatted_address) {
							alert('please choose the address');
							return null;
						}
						
						var componentForm = {
							locality: 'long_name',
							administrative_area_level_1: 'short_name',
							administrative_area_level_2: 'long_name',
							country: 'short_name',
						  };
						
						var obj = {};
						obj.formatted_address = place.formatted_address;
						obj.lat = place.geometry.location.lat();
						obj.lng = place.geometry.location.lng();
						
						for (var i = 0; i < place.address_components.length; i++) {
						  var addressType = place.address_components[i].types[0];
						  if (componentForm[addressType]) {
							var val = place.address_components[i][componentForm[addressType]];
							obj[addressType] = val;
						  }
						}
						
						
						console.log(obj);
						this.props.func4(obj);
					}} types={['geocode']} />
				  <br />
				  <div className="form-group">
					<label>Show Results Within:</label>
					<select className="form-control" value={this.props.foodReducer.boundary} onChange={(e) => { this.props.func5(e.target.value); }}>
						<option value="county">County</option>
						<option value="city">City</option>
						<option value="state">State</option>
						<option value="country">Country</option>
					</select>
				  </div>
				  <button type="submit" className="btn btn-primary form-control">Search</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		foodReducer: state.FoodDonationReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		func1: () => {
			//api or firebase or any url which backend developer has provide to you		
			var url = FirebaseConstant.basePath + '/data/posts';
			//create a reference of above url
			var ref = firebaseDatabase.ref(url);
			ref.on('value', function(snapshot) {
				dispatch(browseFoodDonation(snapshot.val()));	
			});
			
		},
		
		func2: (details) => {
			dispatch(browseFoodDonation(details));	
		},
		func3: (keyword) => {
			dispatch(updateKeyword(keyword));	
		}, //keywords
		func4: (location) => {
			dispatch(updateLocation(location));	
		}, //location
		func5: (boundary) => {
			dispatch(updateBoundary(boundary));	
		} //boundary
							
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);


						
