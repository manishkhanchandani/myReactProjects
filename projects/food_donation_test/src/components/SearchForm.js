import React, {Component} from 'react';

class SearchForm extends Component {
	
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
	
	searchRecords(e) {
		e.preventDefault();//this will stop the form submission
		console.log('form is submitted and state is ', this.state);
		var url = '';
		
		if (this.state.keyword && this.state.location.lat && this.state.location.lng) {
			//user has put keyword and location both
			url = '/search/all/' + encodeURIComponent(this.state.keyword) + '/' + this.state.location.lat + '/' + this.state.location.lng + '/' + this.state.boundary + '/' + encodeURIComponent(this.state.location.formatted_address) + '/' + encodeURIComponent(this.state.location.country) + '/' + encodeURIComponent(this.state.location.administrative_area_level_1) + '/' + encodeURIComponent(this.state.location.administrative_area_level_2) + '/' + encodeURIComponent(this.state.location.locality);
		} else if (this.state.keyword) {
			//user has put only keyword
			url = '/search/keyword/' + encodeURIComponent(this.state.keyword);
		} else if (this.state.location.lat && this.state.location.lng) {
			//user has put only location
			url = '/search/location/' + this.state.location.lat + '/' + this.state.location.lng + '/' + this.state.boundary + '/' + encodeURIComponent(this.state.location.formatted_address) + '/' + encodeURIComponent(this.state.location.country) + '/' + encodeURIComponent(this.state.location.administrative_area_level_1) + '/' + encodeURIComponent(this.state.location.administrative_area_level_2) + '/' + encodeURIComponent(this.state.location.locality);
		}
		
		console.log('url is ', url);
		this.props.history.push(url);
		//window.location.href = url;
	}

	render() {
		return (
			<div>
				<h3>Search</h3>
				<form onSubmit={this.searchRecords.bind(this)}>
				  <div className="form-group">
					<label>Keyword:</label>
					<input type="text" className="form-control" placeholder="Enter any Keyword" value={this.state.keyword} onChange={(e) => { this.setState({keyword: e.target.value}); }} />
				  </div>
				  
				  <label>Location:</label>
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
						
						
						console.log(obj);
						this.setState({location: obj});
					}} types={['geocode']} />
				  <br />
				  <div className="form-group">
					<label>Show Results Within:</label>
					<select className="form-control" value={this.state.boundary} onChange={(e) => {this.setState({boundary: e.target.value});}}>
						<option value="county">County</option>
						<option value="city">City</option>
						<option value="state">State</option>
						<option value="country">Country</option>
					</select>
				  </div>
				  <button type="submit" className="btn btn-primary form-control">Search</button>
				</form>
			</div>
		);
	}
}

export default SearchForm;