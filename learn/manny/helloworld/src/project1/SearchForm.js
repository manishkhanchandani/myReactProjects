import React, {Component} from 'react';

class SearchForm extends Component {
	render() {
		return (
                    <div>
                        <h3>Search Food</h3>
                            <form>
                                    <div> className="form-group">
                                            <label>Keyword</label>
                                            <input type="text" className="form-control" id="keyword" placeholder="Enter Keyword" />
                                    </div> 
                                    <div> className="form-group">
                                            <label>Location</label>
                                            <input type="text" className="form-control" id="location" placeholder="Enter Location" />
                                    </div>   
                                    <div> className="form-group">
                                            <button type="submit" className="btn btn-primary form-control">Search</button>
                                    </div>
                            </form>        
                    </div>
		);	
	}
}

export default SearchForm;