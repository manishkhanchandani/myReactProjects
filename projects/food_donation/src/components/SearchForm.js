import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {connect} from 'react-redux';
import {browseFoodDonation, updateKeyword, updateLocation, updateBoundary} from '../actions/FoodDonationAction.js';

class SearchForm extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			subObjects: {}
		};
	}
	
	componentDidMount() {
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
		console.log('form is submitted and state is ', this.state);
		this.setState({subObjects: {}});
		
		var url = FirebaseConstant.basePath + '/data';
		if (this.props.foodReducer.keyword && this.props.foodReducere.location.lat && this.props.foodReducer.location.lng) {
			//do something
		} else if (this.props.foodReducer.location.lat && this.props.foodReducer.location.lng) {
			//do something
			if (this.props.foodReducer.boundary === 'county') {
				url = url + '/' + this.props.foodReducer.boundary + '/' + this.props.foodReducer.location.country + '/' + this.props.foodReducer.location.administrative_area_level_1 + '/' + this.props.foodReducer.location.administrative_area_level_2;
			} else if (this.props.foodReducer.boundary === 'city') {
				url = url + '/' + this.props.foodReducer.boundary + '/' + this.props.foodReducer.location.country + '/' + this.props.foodReducer.location.administrative_area_level_1 + '/' + this.props.foodReducer.location.administrative_area_level_2 + '/' + this.props.foodReducer.location.locality;
			} else if (this.props.foodReducer.boundary === 'state') {
				url = url + '/' + this.props.foodReducer.boundary + '/' + this.props.foodReducer.location.country + '/' + this.props.foodReducer.location.administrative_area_level_1;
			} else if (this.props.foodReducer.boundary === 'country') {
				url = url + '/' + this.props.foodReducer.boundary + '/' + this.props.foodReducer.location.country;
			}
		} else if (this.props.foodReducer.keyword) {
			//do something
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
	
	searchRecords(e) {
		e.preventDefault();//this will stop the form submission
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