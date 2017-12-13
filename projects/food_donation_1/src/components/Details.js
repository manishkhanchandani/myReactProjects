import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import Comments from './Comments/Comments.js';

class Details extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			detailRecord: null	
		};
	}
	
	componentDidMount() {
		let url = FirebaseConstant.basePath + '/data/posts/' + this.props.match.params.id;
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			this.setState({detailRecord: snapshot.val()});
		});
		
	}

	render() {
		console.log('state is ', this.state);
		if (!this.state.detailRecord) {
			return null;	
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>{this.state.detailRecord.title}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<Comments id={this.props.match.params.id} />
					</div>
					<div className="col-md-6">
						
					</div>
				</div>
			</div>
		);
	}
}

export default Details;