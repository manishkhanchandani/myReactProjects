import React, {Component} from 'react';

class A11 extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.name}</h1>
				<p><b>Age: </b> {this.props.age}</p>
				<p><b>Gender: </b> {this.props.gender}</p>
				<p><b>City: </b> {this.props.city}</p>
				<p><b>State: </b> {this.props.state}</p>
				<p><b>Country: </b> {this.props.country}</p>
			</div>
		);	
	}
}

export default A11;