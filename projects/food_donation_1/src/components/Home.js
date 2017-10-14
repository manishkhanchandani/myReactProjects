import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

class Home extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>Search Food Donation</h3>
						<form>
						  <div className="form-group">
							<label>Keyword</label>
							<input type="text" className="form-control" id="keyword" placeholder="Enter Keyword" />
						  </div>
						  <div className="form-group">
							<label>Location (*)</label>
							<Autocomplete className="form-control" onPlaceSelected={(place) => {
								console.log(place);  
							}}
							types={['geocode']}
							/>
						  </div>
						  <button type="submit" className="btn btn-primary form-control">Search</button>
						</form>
					</div>
					<div className="col-md-9">
						<h3>Search Results</h3>
						<div className="media">
						  <div className="media-left">
							<a href="">
							  <img className="media-object myAccountImg" src="https://www.ndtv.com/cooks/images/mutton-biryani-new.jpg" alt="..." />
							</a>
						  </div>
						  <div className="media-body">
							<h4 className="media-heading">Middle aligned media</h4>
							<div>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</div>
							<div><a href="">Send Message</a> | <a href="">Send Email</a> | <a href="">Call</a></div>
						  </div>
						</div>
						
						<div className="media">
						  <div className="media-left">
							<a href="">
							  <img className="media-object myAccountImg" src="https://budgetbytes.com/wp-content/uploads/2009/12/Garlic-Noodles-front.jpg" alt="..." />
							</a>
						  </div>
						  <div className="media-body">
							<h4 className="media-heading">Middle aligned media</h4>
							<div>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</div>
							<div><a href="">Send Message</a> | <a href="">Send Email</a> | <a href="">Call</a></div>
						  </div>
						</div>
						
						<div className="media">
						  <div className="media-left">
							<a href="">
							  <img className="media-object myAccountImg" src="http://jonvilma.com/images/ice-cream-1.jpg" alt="..." />
							</a>
						  </div>
						  <div className="media-body">
							<h4 className="media-heading">Middle aligned media</h4>
							<div>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</div>
							<div><a href="">Send Message</a> | <a href="">Send Email</a> | <a href="">Call</a></div>
						  </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;