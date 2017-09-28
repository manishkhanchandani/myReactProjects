import React, {Component} from 'react';

class Detail extends Component {
	render() {
		console.log('props are ', this.props);
		console.log('id is :' , this.props.match.params.id);
		return (
					<div>
									Detail - {this.props.match.params.id}
									<br/>
									Title - {this.props.match.params.title}
					</div>
		);
	}
}

export default Detail;