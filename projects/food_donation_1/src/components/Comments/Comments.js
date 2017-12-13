import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class Comments extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			comment: ''	
		};
	}
	
	submitComments() {
		console.log('form submitted');
		var simpleObj = localStorage.getItem('simpleObj');
		var userObj = JSON.parse(simpleObj);
		console.log('userObj: ', userObj);
		var obj = {
			uid: userObj.uid,
			name: userObj.name,
			image: userObj.image,
			message: this.state.comment,
			created_dt: firebase.database.ServerValue.TIMESTAMP
		};
		var url = FirebaseConstant.basePath + '/comments/'+this.props.id;
		var unique_id = firebaseDatabase.ref(url).push(obj).key;
		console.log(unique_id);
	}
	
	
	render() {
		console.log('props are ', this.props);
		console.log('state are ', this.state);
		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<h3>Comments</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<textarea type="text" className="form-control" rows="3" value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}}></textarea><br />
					</div>
					<div className="col-md-12">
						<button type="submit" className="btn btn-primary form-control" onClick={this.submitComments.bind(this)}>Submit</button><br /><br />
					</div>
				</div>
			</div>
		);
	}
}

export default Comments;