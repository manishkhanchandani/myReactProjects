import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

class Edit extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			title: '',
			description: '',
			tags: '',
			imageUrl: '',
			location: {},
			created_dt: '',
			id: '',
			user_id: '',
			record: null
		};
	}
	
	getData(id)
	{
		var url = FirebaseConstant.basePath + '/data/posts/'+id;
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			let results = snapshot.val();
			this.setState({title: results.title, description: results.description, tags: results.tags, imageUrl: results.imageUrl, created_dt: results.created_dt, location: results.location, id: results.id, user_id: results.user_id, record: results});
		});
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
		
	}
	
	submitToFirebase(e) {
		e.preventDefault();
		this.deleteRecord(this.state.record);
		let uniqueID = this.state.id;
		var current = firebase.database.ServerValue.TIMESTAMP;
		var obj = {};
		obj.title = this.state.title;
		obj.description = this.state.description;
		obj.tags = this.state.tags;
		obj.imageUrl = this.state.imageUrl;
		obj.location = this.state.location;
		
		obj.user_id = this.state.user_id;
		obj.id = uniqueID;
		obj.created_dt = this.state.created_dt;
		obj.updated_dt = current;
		

		var url = FirebaseConstant.basePath + '/data/posts/'+uniqueID;
		firebaseDatabase.ref(url).update(obj);
		
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
		this.props.history.push("/confirm_update");
	}
	
	componentDidMount() {
		var uid = localStorage.getItem('userId');
		if (!uid) {
			this.props.history.push("/");	
		}
		
		this.getData(this.props.match.params.id);
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Edit Post</h1>
						<form onSubmit={this.submitToFirebase.bind(this)}>
						  <div className="form-group">
							<label>Title</label>
							<input type="text" value={this.state.title} className="form-control" placeholder="Enter Title" onChange={(e) => {
								this.setState({title: e.target.value});	
							}} />
						  </div>
						  <label>Location: ({this.state.location.formatted_address})</label>
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
						  <button type="submit" className="btn btn-primary form-control">Update Post</button>
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

export default connect(mapStateToProps)(Edit);