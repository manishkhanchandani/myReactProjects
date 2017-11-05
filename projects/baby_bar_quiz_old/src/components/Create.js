import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

class Create extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			title: '',
			description: '',
			tags: '',
			imageUrl: '',
			location: {}
		};
	}
	
	submitToFirebase(e) {
		e.preventDefault();
		var current = firebase.database.ServerValue.TIMESTAMP;
		var obj = {};
		obj.title = this.state.title;
		obj.description = this.state.description;
		obj.tags = this.state.tags;
		obj.imageUrl = this.state.imageUrl;
		obj.location = this.state.location;
		
		obj.user_id = this.props.myReducer.uid;
		obj.created_dt = current;
		

		var url = FirebaseConstant.basePath + '/data/posts';
		var uniqueID = firebaseDatabase.ref(url).push(obj).key;
		firebaseDatabase.ref(url).child(uniqueID).child('id').set(uniqueID);
		
		var country = obj.location.country;
		var state = obj.location.administrative_area_level_1;
		var county = obj.location.administrative_area_level_2;
		var city = obj.location.locality;
		
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/country').child(country).child(uniqueID).set(current);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/state').child(country).child(state).child(uniqueID).set(current);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/county').child(country).child(state).child(county).child(uniqueID).set(current);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/city').child(country).child(state).child(county).child(city).child(uniqueID).set(current);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/users').child(obj.user_id).child(uniqueID).set(current);
		
		
		var tags = this.state.tags.split(',');
		
		if (tags.length > 0) {
			for (var i = 0; i < tags.length; i++) {
				var tag = tags[i].trim();
				
				var tagURL = FirebaseConstant.basePath + '/data/tags/' + tag;
				firebaseDatabase.ref(tagURL + '/country').child(country).child(uniqueID).set(current);
				firebaseDatabase.ref(tagURL + '/state').child(country).child(state).child(uniqueID).set(current);
				firebaseDatabase.ref(tagURL + '/county').child(country).child(state).child(county).child(uniqueID).set(current);
				firebaseDatabase.ref(tagURL + '/city').child(country).child(state).child(county).child(city).child(uniqueID).set(current);
				firebaseDatabase.ref(tagURL + '/all_tag_posts').child(uniqueID).set(current);
			}
		}
		
		//redirect user to confirm page
		this.props.history.push("/confirm");
	}
	
	render() {
		console.log('state value: ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Create New Post</h1>
						<form onSubmit={this.submitToFirebase.bind(this)}>
						  <div className="form-group">
							<label>Title</label>
							<input type="text" value={this.state.title} className="form-control" placeholder="Enter Title" onChange={(e) => {
								this.setState({title: e.target.value});	
							}} />
						  </div>
						  <label>Location</label>
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
								
								this.setState({location: obj});
								
							}} types={['geocode']} />
							
							<div className="form-group mySpacing">
								<label>Description</label>
								<textarea rows="5" className="form-control" value={this.state.description} onChange={(e) => {
									this.setState({description: e.target.value});	
								}}></textarea>
							  </div>
							  
							<div className="form-group mySpacing">
								<label>Tags (Comma separated tags for searching)</label>
								<input type="text" className="form-control" placeholder="Enter Tags" value={this.state.tags} onChange={(e) => {
									this.setState({tags: e.target.value});	
								}} />
							  </div>
							  
							 <div className="form-group mySpacing">
								<label>Image URL</label>
								<input type="text" className="form-control" placeholder="Enter Image URL" value={this.state.imageUrl} onChange={(e) => {
									this.setState({imageUrl: e.target.value});	
								}} />
							  </div>
							
						  <br />
						  <button type="submit" className="btn btn-primary form-control">Create New Post</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer	
	};	
};

export default connect(mapStateToProps)(Create);