import React, {Component} from 'react';

class Sample extends Component {
	render() {
		return (
			<div>
				Sample - {this.props.match.params.number}
			</div>
		);
	}
}

export default Sample;