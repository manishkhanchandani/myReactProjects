import React, { Component } from 'react';

class Challenge extends Component {
	render() {
		return (	
<div class="container">
	<div class="row">
		<div className="col-md-3"><h3>Search Food</h3>
		<form>
		  <div className="form-group">
			<label>Keyword</label>
			<input type="text" className="form-control" id="keyword" placeholder="Enter Keyword" />
		  </div>
		  <div className="form-group">
			<label>Location</label>
			<input type="text" className="form-control" id="location" placeholder="Enter Location" />
		  </div>
		  <button type="submit" className="btn btn-primary form-control">Search</button>
		</form>
	</div>
				<div className="col-md-9"><h3>Col 2</h3></div>
	</div>
</div>
		);	
	}
}

export default Challenge;