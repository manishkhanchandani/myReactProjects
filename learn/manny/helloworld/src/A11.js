import React, {Component} from 'react';

class A11 extends Component {
	render() {
		return (
			<span className="label label-default">{this.props.name} - {this.props.age} / {this.props.gender} </span>
		);	
	}
}

export default A11;