import React, { Component } from 'react';


class Search extends Component {
  render() {
    return (
        <form>
		  <h3>Search Food</h3>
		  <div className="form-group">
			<label>Keyword</label>
			<input type="text" className="form-control" id="keyword" placeholder="Enter keyword"/>
		  </div>
		  <div className="form-group">
			<label>Location</label>
			<input type="text" className="form-control" id="location" placeholder="Enter "/>
		  </div>
		 
		  <button type="submit" className="btn btn-default form-control">Submit</button>
</form>
    );
  }
}

export default Search;
// JavaScript Document