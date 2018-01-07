import React, {Component} from 'react';

import {timeAgo} from '../../utilities/functions.js';
import SimpleQuizAnsOptions from './SimpleQuizAnsOptions.js';
import {Button} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import DeleteModal from '../common/DeleteModal.js';
import {withRouter} from 'react-router';
import {getUID} from '../auth/AuthAction.js';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class SimpleQuizResults extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			deleteModal: false	
		};
	}
	
	close() {
		this.setState({deleteModal: false});
	}
	
	deleteRecord(record) {
		if (!this.props.match.params.subject) {
			return;
		}
		if (!this.props.match.params.issue) {
			return;
		}
		let uid = getUID();
		if (!uid) {
			return;
		}
		let subject = '';
		subject = '/' + this.props.match.params.subject;
		let issue = '';
		issue = '/' + this.props.match.params.issue;
		let uidPath = '/' + uid;
		let url = FirebaseConstant.basePath + '/quiz/simple_quiz' + uidPath + subject + issue;
		firebaseDatabase.ref(url).child(record.id).set(null);
		
		this.props.onActivePageChange(1);
		this.props.callGetSimpleQuiz(uid, this.props.match.params.subject, this.props.match.params.issue);
		
		//saving delete record
		let obj = {};
		obj.created_dt = record.created_dt;
		obj.details = record.details;
		obj.total = record.total;
		let urlDeleted = FirebaseConstant.basePath + '/quiz/simple_quiz_deleted' + uidPath + subject + issue;
		firebaseDatabase.ref(urlDeleted).child(record.id).set(obj);
		this.close();
	}

	render() {
		if (!this.props.quizDetails) {
			return null;	
		}
		
		var dt = new Date(this.props.quizDetails.created_dt).toString();

		return (
			<div className="results">
				
					{this.props.pastResults ? 
						<h3>{timeAgo(this.props.quizDetails.created_dt)}<br /><small>ID: {this.props.quizDetails.id}</small></h3>
						:
						<h3>Results</h3>
					}
				
				
				<div className="row">
					<div className="col-md-12">
						<b>Total:</b> {this.props.quizDetails.total} / ({this.props.quizDetails.details.length * 20})
					</div>
				</div>
				
				<br />
				<div className="row">
					<div className="col-md-12">
				
					{
						this.props.quizDetails.details.map((value, key) => {
							return <div key={key} className="panel panel-primary">
							  <div className="panel-heading"><b>Question {key + 1}.</b> {renderHTML(value.question)}</div>
							  <div className="panel-body">
								<SimpleQuizAnsOptions id={value.id} opts={value.answerOptions} optionChoosen={value.choosenOption} correct={value.correct} viewOnly={true} />
							  </div>
							</div>					
						})
					}
					</div>
					<div className="col-md-12">
					<br />
					{
						this.props.quizDetails.id && 
						<div><a href="" onClick={(e) => {e.preventDefault(); this.setState({deleteModal: true})}}>Delete This Record</a>
							<DeleteModal message={`id: ${this.props.quizDetails.id}`} closeFn={this.close.bind(this)} deleteRecordFn={this.deleteRecord.bind(this)} deleteModal={this.state.deleteModal} details={this.props.quizDetails} />  
						</div>
					}
					<br />
					<b>Created On:</b> {dt})
					</div>
				</div>
				
				{
					this.props.quiz_start &&
					<Button bsStyle="primary" className="form-control" onClick={this.props.quiz_start.bind(this, false)}>Close Quiz</Button>
					
				}
				
			</div>
		);
	}
}

export default withRouter(SimpleQuizResults);