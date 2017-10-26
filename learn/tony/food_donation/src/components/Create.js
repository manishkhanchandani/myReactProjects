import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
// import Auth from './Auth.js';

class Create extends Component {

	// This is used by react to save the state
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			description: "",
			tags: "",
			imageUrl: "",
			location: {}
		};
	}

	submitToFireBase(e) {
		e.preventDefault();
		console.log("hello world");
		//write to firebase
	}

	render() {
		// Check the state value
		console.log('state value: ', this.state);
		return (
			<div className="container">
			{/* 	<Auth /> */}
				<div className="row">
					<div className="col-md-12">
						<h1>Create New Post</h1>
						
						<form onSubmit={this.submitToFireBase.bind(this)}>
						  <div className="form-group">
							<label>Title</label>
							<input type="text" value= {this.state.title} className="form-control" placeholder="Enter Title" 
									onChange={(e) => {this.setState({title: e.target.value}); 
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
								// console.log(obj);
							}} types={['geocode']} />
							
							<div className="form-group mySpacing">
								<label>Description</label>
								<textarea rows="5" className="form-control" value={this.state.description}
									onChange={(e) => {this.setState({description: e.target.value});	
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

export default Create;