import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; 

import {createPost} from '../actions/FoodDonation.js';

class Create extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: 'mango',
            location: {
                formatted_address: "Santa Clara, CA, USA",
                administrative_area_level_1: "CA",
                administrative_area_level_2: "Santa Clara County",
                country: "US",
                lat: 37.35410789999999,
                lng: -121.95523559999998,
                locality: "Santa Clara"
                    
            },
            description: 'mango is here',
            tags: 'mango,here, santa clara, more',
            imageUrl: 'http://www.mango.org/Mangos/media/Media/Images/Consumer%20Page%20Teaser/haden.png'
        };   
    }
    
    updateState(field, value) {
        var obj = {};
        obj[field] = value;
        this.setState(obj);
    }
    
    updateCreatePost(field, e) {
        this.updateState(field, e.target.value);
    }

    submitCreatePost() {
        var myObj = {
            title: this.state.title,
            location: this.state.location,
            description: this.state.description,
            tags: this.state.tags,
            imageUrl: this.state.imageUrl,
            user_id: this.props.myReducer.uid
        };
        this.props.callCreatePost(myObj);
    }

	render() {
        if (!this.props.myReducer.displayName) {
            return <Redirect to="/" push={true} />;
        }
        console.log('state is ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Create New Post</h1>
						  <div className="form-group">
							<label>Title</label>
							<input type="text" className="form-control" placeholder="Enter Title" onChange={this.updateCreatePost.bind(this, 'title')} value={this.state.title} />
						  </div>
						  <label>Location</label>
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
								
								
                             this.updateState('location', obj);
							}} types={['geocode']} />
							
							<div className="form-group mySpacing">
								<label>Description</label>
								<textarea rows="5" className="form-control" onChange={this.updateCreatePost.bind(this, 'description')} value={this.state.description}></textarea>
							  </div>
							  
							<div className="form-group mySpacing">
								<label>Tags (Comma separated tags for searching)</label>
								<input type="text" className="form-control" placeholder="Enter Tags" onChange={this.updateCreatePost.bind(this, 'tags')} value={this.state.tags} />
							  </div>
							  
							 <div className="form-group mySpacing">
								<label>Image URL</label>
								<input type="text" className="form-control" placeholder="Enter Image URL" onChange={this.updateCreatePost.bind(this, 'imageUrl')} value={this.state.imageUrl} />
							  </div>
							
						  <br />
						  <button type="submit" className="btn btn-primary form-control" onClick={this.submitCreatePost.bind(this)}>Create New Post</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    myReducer: state.MyReducer,
    foodDonationReducer: state.FoodDonationReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    callCreatePost: (obj) => {
      dispatch(createPost(obj));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Create);