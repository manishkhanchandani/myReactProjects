import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

class Home extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>Search</h3>
						<form>
							<div className="form-group">
							<label>Keyword</label>
							<input type="text" className="form-control" placeholder="Enter any Keyword" />
							</div>
							
							<Autocomplete className="form-control" onPlaceSelected={(place) => {
								console.log(place);  
							}} types={['geocode']} />
							
							<button type="submit" className="btn btn-primary form-control">Search</button>
							</form>
					</div>
					<div className="col-md-9">
						<h3>Result</h3>
					</div>
				</div>	
			</div>
		);
	}
}

export default Home;