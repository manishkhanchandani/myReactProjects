import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

class Home extends Component {
	constructor(props) {
		super(props);
		
		const list_id = this.props.match.params.list ? this.props.match.params.list : FirebaseConstant.defaultListId;
		this.state = {
			list_id: list_id
		};
	}
	render() {
		return (
			<div>
				Home - {this.state.list_id}
			</div>
		);
	}
}

export default Home;