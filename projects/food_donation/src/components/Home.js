import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

import {connect} from 'react-redux';
import {browseFoodDonation} from '../actions/FoodDonationAction.js';

import ResultContainer from './ResultContainer.js';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


class Home extends Component {
	
	componentDidMount() {
		this.props.func1();
	}
	

	render() {
		
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>Search</h3>
						<form>
						  <div className="form-group">
							<label>Keyword</label>
							<input type="text" className="form-control" placeholder="Enter any Keyword" />
						  </div>
						  
						  <Autocomplete className="form-control addressBox" onPlaceSelected={(place) => {
							  
							  	if (!place.formatted_address) {
									alert('please choose the address');
									return null;
								}
								
								console.log(place);
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
							}} types={['geocode']} />
						  <br />
						  <button type="submit" className="btn btn-primary form-control">Search</button>
						</form>
					</div>
					<div className="col-md-9">
						<h3>Results</h3>
						
						<ResultContainer data={this.props.foodReducer.data} />
						
						
						
					</div>
				</div>
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
			
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);