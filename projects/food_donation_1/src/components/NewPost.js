import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {connect} from 'react-redux';

import {createNewPost} from '../actions/FoodAction.js';

class NewPost extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			title: 'Some Indian Food',
			location: {
				formatted_address: "Santa Clara, CA, USA",
				administrative_area_level_1: "CA",
				administrative_area_level_2: "Santa Clara County",
				country: "US",
				locality: "Santa Clara",
				lat: 37.35410789999999,
				lng: -121.95523559999998
			},
			description: 'nice indian food for donation',
			tags: 'indian, indian food, some, some indian food',
			imageUrl: 'https://www.ndtv.com/cooks/images/samosa-620.jpg',
			name: 'John',
			email: 'john@gmail.com',
			phone: '555-555-5555'
		};
	}
	
	updateState(field, value) {
		var obj = {};
		obj[field] = value;
		this.setState(obj);
	}
	
	updateCreatePost(fieldName, e) {
		this.updateState(fieldName, e.target.value);
	}
	
	
	submitDataToFb(e) {
		e.preventDefault();
		
		var obj = {};
		obj.title = this.state.title;
		obj.location = this.state.location;
		obj.description = this.state.description;
		obj.tags = this.state.tags;
		obj.imageUrl = this.state.imageUrl;
		obj.name = this.state.name;
		obj.email = this.state.email;
		obj.phone = this.state.phone;
		this.props.func1(obj);
	}
	
	
	render() {
		console.log('this state is ', this.state);
		return (
			<div className="container">
				<h3>Create New Food Donation Post</h3>
				<form onSubmit={this.submitDataToFb.bind(this)}>
				  <div className="form-group">
					<label>Title (*)</label>
					<input type="text" className="form-control" id="title" placeholder="Enter Title" value={this.state.title} onChange={this.updateCreatePost.bind(this, 'title')} />
				  </div>
				  <div className="form-group">
					<label>Location (*)</label>
					<Autocomplete className="form-control addressBox" onPlaceSelected={(place) => {
						
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
						
						for (var i = 0; i < place.address_components.length; i++) {
							var addressType = place.address_components[i].types[0];
							if (componentForm[addressType]) {
								var val = place.address_components[i][componentForm[addressType]];
								obj[addressType] = val;
							}
						}
						
						this.updateState('location', obj);
					}}
					types={['geocode']}
					/>
				  </div>
				  <div className="form-group">
					<label>Description</label>
					<textarea className="form-control" id="description" placeholder="Enter Description" rows="5" value={this.state.description} onChange={this.updateCreatePost.bind(this, 'description')}></textarea>
				  </div>
				  <div className="form-group">
					<label>Tags: (Comma separated keywords for search)</label>
					<input type="text" className="form-control" id="tags" placeholder="Enter Tags" value={this.state.tags} onChange={this.updateCreatePost.bind(this, 'tags')} />
				  </div>
				  <div className="form-group">
					<label>Image URL:</label>
					<input type="text" className="form-control" id="imageUrl" placeholder="Enter Image URL" value={this.state.imageUrl} onChange={this.updateCreatePost.bind(this, 'imageUrl')} />
				  </div>
				  <div className="form-group">
					<label>Name:</label>
					<input type="text" className="form-control" id="name" placeholder="Enter Name" value={this.state.name} onChange={this.updateCreatePost.bind(this, 'name')} />
				  </div>
				  <div className="form-group">
					<label>Email:</label>
					<input type="text" className="form-control" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.updateCreatePost.bind(this, 'email')} />
				  </div>
				  <div className="form-group">
					<label>Phone:</label>
					<input type="text" className="form-control" id="phone" placeholder="Enter Phone" value={this.state.phone} onChange={this.updateCreatePost.bind(this, 'phone')} />
				  </div>
				  <button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		uReducer: state.UserReducer,
		fReducer: state.FoodReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		func1: (obj) => {
			dispatch(createNewPost(obj));	
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);