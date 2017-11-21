import React, {Component} from 'react';


class WildcardMatching extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			values: '',
			result: ''	
		};
	}
	
	convert(e) {
		e.preventDefault();
		this.setState({values: e.target.value, result: false});
		var s = e.target.value;
		if (!s) return;
		//logic goes here
		
		//set result
		this.setState({result: ''});
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<h3>WildcardMatching</h3>
				<div className="form-group">
					<label>Enter Values</label>
					<input type="text" value={this.state.values} className="form-control" placeholder="Enter Values" onChange={this.convert.bind(this)} /><br />
					<a href="" onClick={this.convert.bind(this)} className="btn btn-primary form-control">Submit</a>
				  </div>
				  <h3>Result is {this.state.result} </h3>
			</div>
		);
	}
}

export default WildcardMatching;