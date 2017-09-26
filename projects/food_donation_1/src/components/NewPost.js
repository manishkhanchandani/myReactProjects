import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

class NewPost extends Component {
	render() {
		return (
			<div className="container">
				<h3>Create New Food Donation Post</h3>
				<form>
				  <div className="form-group">
					<label>Title (*)</label>
					<input type="text" className="form-control" id="title" placeholder="Enter Title" />
				  </div>
				  <div className="form-group">
					<label>Location (*)</label>
					<Autocomplete className="form-control" onPlaceSelected={(place) => {
						console.log(place);  
					}}
					types={['geocode']}
					/>
				  </div>
				  <div className="form-group">
					<label>Description</label>
					<textarea className="form-control" id="description" placeholder="Enter Description" rows="5"></textarea>
				  </div>
				  <div className="form-group">
					<label>Image URL:</label>
					<input type="text" className="form-control" id="imageUrl" placeholder="Enter Image URL" />
				  </div>
				  <div className="form-group">
					<label>Name:</label>
					<input type="text" className="form-control" id="name" placeholder="Enter Name" />
				  </div>
				  <div className="form-group">
					<label>Email:</label>
					<input type="text" className="form-control" id="email" placeholder="Enter Email" />
				  </div>
				  <div className="form-group">
					<label>Phone:</label>
					<input type="text" className="form-control" id="phone" placeholder="Enter Phone" />
				  </div>
				  <button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

export default NewPost;