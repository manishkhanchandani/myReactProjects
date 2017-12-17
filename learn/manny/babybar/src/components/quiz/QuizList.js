import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import * as quizActions from './QuizAction.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import QuizShowDelete from './QuizShowDelete.js';
import {getUID, getUsersObj} from '../auth/AuthAction.js';

class QuizLizt extends Component {
	
	componentDidMount() {
		this.props.callListQuiz();
	}
	
	open(rec, e) {
		e.preventDefault();
		this.props.callOpen(rec);
	}
	
	acceptRecord(rec, e) {
		e.preventDefault();
		const uObject = getUsersObj();
		//make other post unusable
		
		
		var obj = {
			status: 'Started',
			accepted_dt: firebase.database.ServerValue.TIMESTAMP,
			user2_creator: uObject.displayName,
			user2_uid: uObject.uid,
			user2_photoURL: uObject.photoURL,
			user1_status: 'Pending',
			user2_status: 'Pending',
			quizDetails: {
				common: {
					question_pointer: 0
				}
			}
		};
		obj[uObject.uid] = {
			points: 0	
		}
		var url = FirebaseConstant.basePath + '/quiz/posts';
		firebaseDatabase.ref(url).child(rec.id).update(obj);
	}
	
	render() {
		const uid = getUID();
		return (
			<div>
				<div className="panel panel-danger">
				  <div className="panel-heading">
					<h3 className="panel-title"><b>Current Quiz Open Challenges</b></h3>
				  </div>
				  <div className="panel-body">
						{
							!this.props.quizReducer.data &&
							<Alert bsStyle="warning">
								{this.props.quizReducer.data_error}
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
												<td><img src={value.user1_photoURL} alt={value.user1_creator} /></td>
												<td>{value.user1_creator}<br />ID: <b>{value.id}</b></td>
												<td>{value.dt}</td>
												<td>{value.topic}</td>
												<td>
												{
													uid !== value.user1_uid ?
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
						<QuizShowDelete />
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
		callListQuiz: () => {
			dispatch(quizActions.listQuiz(dispatch));	
		},
		callOpen: (rec) => {
			dispatch(quizActions.open(rec));	
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizLizt);