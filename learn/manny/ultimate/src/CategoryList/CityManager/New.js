import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Alert} from 'react-bootstrap';
import {getUID} from '../../utilities/functions.js';


class CityManagerNew extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			uid: '',
			name: '',
			description: '',
			tags: '',
			imageUrl: '',
			location: {},
			error: null,
			files: []
		};
	}
	
	componentDidMount() {
		var uid = getUID();
		if (!uid) {
			//this.props.history.push("/");	
		}
		
		this.setState({uid: uid});
	}
	
	submitToFirebase() {
		
	}

	render() {
		console.log('state is ', this.state);
		return (
			<div className="container city-manager-new">
				<h1>Become City Manager</h1>
				<div className="row">
					<div className="col-md-12">
						{
							this.state.error &&
							<Alert bsStyle="warning">
								{this.state.error}
							</Alert>
						}
						<form onSubmit={this.submitToFirebase.bind(this)}>
						  <div className="form-group">
							<label>Name *</label>
							<input type="text" value={this.state.name} className="form-control" placeholder="Enter Name" onChange={(e) => {
								this.setState({name: e.target.value});	
							}} />
						  </div>
						  <label>City * (You want to become manager of which city, this should be city where you live or work in)</label>
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
								
								this.setState({location: obj});
								
							}} types={['(cities)']} />
							
						  	<br />
							<b>Note: </b> Your application will be in review and you will be notified in mail if you are selected or not.
						  <br />
						  <br />
						  <button type="submit" className="btn btn-primary form-control">Apply</button>
						  
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default CityManagerNew;