import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 

class Detail extends Component {

	render() {
			console.log('props are ', this.props);
			console.log('id is : ', this.props.match.params.id);
		return (
			<div>
				<h1>Detail - {this.props.match.params.id}</h1>
			
			<br />
			
			Title is - {this.props.match.params.title}
			</div>
		);
	}
}

export default Detail;