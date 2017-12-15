import React, {Component} from 'react';

import {connect} from 'react-redux';
import CategoriesJson from './quiz_categories.json';
import {getUID, getUsersObj} from '../auth/AuthAction.js';
import {getRandomizer, dynamicSort, timeAgo} from '../../utilities/functions.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import './Quiz.css';
import {Alert, Button, Modal} from 'react-bootstrap';
import * as quizActions from './QuizAction.js';


class Quiz extends Component {
	
	constructor(props) {
		 super(props);
		 var current = new Date();
		 var now = current.getTime();
		 this.state = {
			records: null,
			current: timeAgo(now),
			error: 'Loading Challenges ....',
			showModal: false,
			currentRecord: null
		 };
	}
	
	//modal
	close() {
		this.setState({ showModal: false, currentRecord: null });
	}
	
	open(rec, e) {
		e.preventDefault();
		this.setState({ showModal: true, currentRecord: rec });
	}
	//modal
	
	componentDidMount() {
		this.props.callListQuiz();
	}

	createQuiz(topic, e) {
		e.preventDefault();
		this.props.callCreateQuiz(topic);
	}
	
	acceptRecord(rec, e) {
		e.preventDefault();
		var url = FirebaseConstant.basePath + '/quiz/posts';
		firebaseDatabase.ref(url).child(rec.id).child('status').set('Started');
	}
	
	deleteRecord() {
		var url = FirebaseConstant.basePath + '/quiz/posts';
		firebaseDatabase.ref(url).child(this.state.currentRecord.id).set(null);
		this.close();
	}
	
	render() {
		console.log('state is ', this.props);
		const uid = getUID();
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
							!this.props.quizReducer.data &&
							<Alert bsStyle="warning">
								{this.props.quizReducer.error}
							  </Alert>
						}
						{
							this.props.quizReducer.data &&
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
										this.props.quizReducer.data.map((value, key) => {
											return <tr key={key}>
												<td><img src={value.photoURL} /></td>
												<td>{value.creator}<br />ID: <b>{value.id}</b></td>
												<td>{value.dt}</td>
												<td>{value.topic}</td>
												<td>
												{
													uid != value.uid ?
													<a href="" onClick={this.acceptRecord.bind(this, value)}>Accept</a>
													:
													<a href="" onClick={this.open.bind(this, value)}>Delete</a>
												}
												</td>
											</tr>
										})
									}
									
									</tbody>
								</table>
							</div>
						}
						
						<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
							<Modal.Header closeButton>
								<Modal.Title>Confirmation</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<h4>Delete Record with ID: {this.state.currentRecord && this.state.currentRecord.id} </h4>
								<p>Do you really want to delete this record? You wont be able to recover it later?</p>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.deleteRecord.bind(this)}>Delete Record</Button>
							</Modal.Footer>
						</Modal>
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

const mapStateToProps = (state) => {
	return {
		quizReducer: state.QuizReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		callCreateQuiz: (topic) => {
			dispatch(quizActions.createQuiz(topic));
		},
		callListQuiz: () => {
			dispatch(quizActions.listQuiz(dispatch));	
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);