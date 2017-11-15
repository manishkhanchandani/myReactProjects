import React, {Component} from 'react';

class Sample2 extends Component {
	render() {
		return (
			<div>
				Sample2 - {this.props.match.params.number}
			</div>
		);
	}
}

export default Sample2;