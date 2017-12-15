import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

import {timeAgo, processRecords} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';

class Comments extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			comment: '',
			data: null,
			filterTerm: '',
			pageNumber: 1
		};
	}
	
	componentDidMount() {
		var url = FirebaseConstant.basePath + '/comments/' + this.props.id;
		var ref = firebaseDatabase.ref(url).limitToLast(500);
		
		ref.off();
		ref.on('value', (snapshot) => {
			var records = snapshot.val();
			
			if (!records) {
				this.setState({data: null});
				return;
			}
			
			var myArray = [];
			for (var key in records) {
				var obj = records[key];
				obj.dt = timeAgo(obj.created_dt);
				myArray.push(obj);	
			}
			
			this.setState({data: myArray});;
		});
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	submitComments() {
		var userObjStr = localStorage.getItem('userObj');
		var userObj = JSON.parse(userObjStr);
		var obj = {
			uid: userObj.uid,
			name: userObj.displayName,
			image: userObj.photoURL,
			message: this.state.comment,
			created_dt: firebase.database.ServerValue.TIMESTAMP
		}
		
		var url = FirebaseConstant.basePath + '/comments/' + this.props.id;
		var unique_id = firebaseDatabase.ref(url).push(obj).key;
		this.setState({comment: ''});
		
	}
	
	
	render() {
		console.log('comments props are ', this.props);
		console.log('state are ', this.state);
		return (
			<div className="comments">
				<div className="row">
					<div className="col-md-12">
						<h3>Comments</h3>
					</div>
				</div>
				
				<div className="row">
					<div className="col-md-12">
						<textarea className="form-control" rows="3" value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}}></textarea><br />
					</div>
					<div className="col-md-12">
						<button type="submit" className="btn btn-primary form-control" onClick={this.submitComments.bind(this)}>Submit</button><br />
					</div>
				</div>
				
				<div className="row">
					<div className="col-md-12">
						
					</div>
				</div>
				
				
			</div>
		);
	}
}

export default Comments;

/*
Comments

1. Create the html elements
2. Create submission to firebase
3. To retreive the data from firebase

*/