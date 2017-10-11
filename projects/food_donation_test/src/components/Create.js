import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; 

class Create extends Component {
	render() {
        if (!this.props.myReducer.displayName) {
            return <Redirect to="/" push={true} />;
        }
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Create New Post</h1>
						<form>
						  <div className="form-group">
							<label>Title</label>
							<input type="text" className="form-control" placeholder="Enter Title" />
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
								
								
								console.log(obj);
							}} types={['geocode']} />
							
							<div className="form-group mySpacing">
								<label>Description</label>
								<textarea rows="5" className="form-control"></textarea>
							  </div>
							  
							<div className="form-group mySpacing">
								<label>Tags (Comma separated tags for searching)</label>
								<input type="text" className="form-control" placeholder="Enter Tags" />
							  </div>
							  
							 <div className="form-group mySpacing">
								<label>Image URL</label>
								<input type="text" className="form-control" placeholder="Enter Image URL" />
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Create);