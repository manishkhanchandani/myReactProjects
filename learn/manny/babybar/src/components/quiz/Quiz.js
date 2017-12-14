import React, {Component} from 'react';

import CategoriesJson from './quiz_categories.json';
import {getUID, getUsersObj} from '../auth/AuthAction.js';
import {getRandomizer, dynamicSort, timeAgo} from '../../utilities/functions.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import './Quiz.css';
import {Alert} from 'react-bootstrap';

class Quiz extends Component {
	
	constructor(props) {
		 super(props);
		 var current = new Date();
		 var now = current.getTime();
		 this.state = {
			records: null,
			current: timeAgo(now),
			error: 'Loading Challenges ....'
		 };
	}
	
	componentDidMount() {
		var url = FirebaseConstant.basePath + '/quiz/posts';
		var ref = firebaseDatabase.ref(url).orderByChild('status').equalTo('Pending');
		
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result) {
				this.setState({error: 'No Challenges Available. Please Create one!!', records: null});
				return;
			}
			var myArray = [];
			var current = new Date();
			var now = ((current.getTime() / 1000) - (10 * 60)) * 1000;
			for (var key in result) {
				var obj = result[key];
				if (obj.created_dt < now) {
					continue;
				}
				obj.dt = timeAgo(obj.created_dt);
				myArray.push(obj);
			}
			
			//sorting
			myArray.sort(dynamicSort('-created_dt'));
			
			//filtering
			this.setState({records: myArray, current: timeAgo(now), error: null});
		});
	}

	createQuiz(topic, e) {
		e.preventDefault();
		const uid = getUID();
		const uObject = getUsersObj();
		var obj = {};
		obj.creator = uObject.displayName;
		obj.uid = uObject.uid;
		obj.photoURL = uObject.photoURL;
		obj.topic = topic.key;
		obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
		obj.status = 'Pending';
		
		obj.questions = [];
		//find min and max question number for topic
		var num = 0;
		var tmpObj = {};
		var randomNumber = getRandomizer(0, 99);
		while (num < 5) {
			var tmp = randomNumber();
			if (!tmpObj[tmp]) {
				tmpObj[tmp] = 1;
				obj.questions.push(tmp);
				num++;
			}
		}

		var url = FirebaseConstant.basePath + '/quiz/posts';
		var uniqueID = firebaseDatabase.ref(url).push(obj).key;
		firebaseDatabase.ref(url).child(uniqueID).child('id').set(uniqueID);
	}
	
	render() {
		console.log('state is ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>California Baby Bar Quiz Challenges</h1>
						<p>Challenge quiz with friends and others</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-9 challenges">
						<h3>Current Quiz Challenges</h3>
						{
							!this.state.records &&
							<Alert bsStyle="warning">
								{this.state.error}
							  </Alert>
						}
						{
							this.state.records &&
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<th></th>
										<th>Creator</th>
										<th>Created</th>
										<th>Topic</th>
										<th>Action</th>
									</tr>
									{
										this.state.records.map((value, key) => {
											return <tr key={key}>
												<td><img src={value.photoURL} /></td>
												<td>{value.creator}<br />ID: <b>{value.id}</b></td>
												<td>{value.dt}</td>
												<td>{value.topic}</td>
												<td>Action</td>
											</tr>
										})
									}
									
									</tbody>
								</table>
							</div>
						}
					</div>
					<div className="col-md-3">
						<h3>Create Quiz :: Choose Topic</h3>
						{
							CategoriesJson && 
							<ul className="list-group">
							{
								CategoriesJson.map((value, key) => {
									return <li key={key} className="list-group-item"><a href="" onClick={this.createQuiz.bind(this, value)}>{value.name}</a></li>				
								})
							}
							</ul>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Quiz;