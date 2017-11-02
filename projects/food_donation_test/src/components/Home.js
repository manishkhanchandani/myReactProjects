import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {connect} from 'react-redux';

import ResultsContainer from './ResultsContainer.js';
import {browsePost} from '../actions/FoodDonation.js';

import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


class Home extends Component {
	
    constructor(props) {
        super(props);
        
        this.state = {
            keyword: '',
            location: {
                formatted_address: "",
                administrative_area_level_1: "",
                administrative_area_level_2: "",
                country: "",
                lat: null,
                lng: null,
                locality: ""
                    
            },
            boundary: 'county'
        };   
    }
    
    updateState(field, value) {
        var obj = {};
        obj[field] = value;
        this.setState(obj);
    }
    
    updatePost(field, e) {
        this.updateState(field, e.target.value);
    }

    submitCreatePost(e) {
        e.preventDefault();
        console.log(this.state);
		var url = '';
		if (this.state.keyword && this.state.location.formatted_address) {
			//keyword and location is set
			url = '/search/all/'+encodeURIComponent(this.state.keyword)+'/'+this.state.location.lat+'/'+this.state.location.lng+'/'+encodeURIComponent(this.state.location.formatted_address);
		} else if (this.state.location.formatted_address) {
			// location is set
			url = '/search/location/'+this.state.location.lat+'/'+this.state.location.lng+'/'+encodeURIComponent(this.state.location.formatted_address);
		} else if (this.state.keyword) {
			//keyword is set
			url = '/search/keyword/'+encodeURIComponent(this.state.keyword);
		}
		console.log('url is ', url);
		this.props.history.push(url);
    }

    componentDidMount() {
        this.props.func1();   
    }
	render() {
		console.log('state is ', this.state);
		console.log('props is ', this.props);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>Search</h3>
						<form onSubmit={this.submitCreatePost.bind(this)}>
						  <div className="form-group">
							<label>Keyword</label>
							<input type="text" className="form-control" placeholder="Enter any Keyword"  value={this.state.keyword} onChange={this.updatePost.bind(this, 'keyword')} />
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
								this.updateState('location', obj);
							}} types={['geocode']} />
						  <br />
						  <div className="form-group">
							<label>Keyword</label>
							<select className="form-control" value={this.state.boundary} onChange={this.updatePost.bind(this, 'boundary')}>
								<option value="county">County</option>
								<option value="city">City</option>
								<option value="state">State</option>
								<option value="country">Country</option>
							</select>
						  </div>
						  <button type="submit" className="btn btn-primary form-control">Search</button>
						</form>
					</div>
					<div className="col-md-9">
						<h3>Results</h3>
						<ResultsContainer data={this.props.foodDonationReducer.data} />
						
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
    func1: () => {
		var url = FirebaseConstant.basePath + '/data/posts';
		var ref = firebaseDatabase.ref(url).orderByChild('created_dt').limitToLast(500);
		ref.on('value', function(snapshot) {
			var result = snapshot.val();
		  	dispatch(browsePost(result));
		});
      
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);