import React, {Component} from 'react';

import {Button} from 'react-bootstrap';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import SimpleQuizResults from './SimpleQuizResults.js';
import {getUID} from '../auth/AuthAction.js';
import SimpleQuizAnsOptions from './SimpleQuizAnsOptions.js';

class SimpleQuiz extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {			
			quizDisplay: false,
			quizPage: 0,
			quizPoints: 0,
			quizChoosenOption: null,
			quizIsCorrect: null,
			quizStatus: 'Pending',
			quizDetails: {
				total: 0,
				details: [],
				created_dt: null
			}
		};
		
		this.handleChooseOption = this.handleChooseOption.bind(this);
	}
	
	handleChooseOption(e) {
		this.setState({quizChoosenOption: e.target.value});
	}

	quizNext(data, type) {
		let record = this.state.quizDetails;
		let obj = JSON.parse(JSON.stringify(data[this.state.quizPage]));
		obj.isCorrect = false;
		
		
		let choosenOption = parseInt(this.state.quizChoosenOption, 10);
		obj.choosenOption = choosenOption;
		let pts = 0;
		let isCorrect = 'Incorrect Answer, Correct Option is Number ' + (data[this.state.quizPage].correct + 1) + ', i.e. ' + data[this.state.quizPage].answerOptions[data[this.state.quizPage].correct];
		
		if (choosenOption === data[this.state.quizPage].correct) {
			pts = 20;
			isCorrect = 'Correct Answer';
			obj.isCorrect = true;
		}
		
		let totalPoints = this.state.quizPoints;
		totalPoints = totalPoints + pts;
		obj.pts = pts;

		record.total = totalPoints;
		record.details.push(obj);
		this.setState({quizPoints: totalPoints, quizIsCorrect: isCorrect, quizPage: this.state.quizPage + 1, quizDetails: record, quizChoosenOption: null});
		
		if (type === 2) {
			//save in firebase	
			this.setState({quizStatus: 'Completed'});
			if (!this.props.subjectUrl) {
				return;
			}
			if (!this.props.issueUrl) {
				return;
			}
			let uid = getUID();
			if (!uid) {
				return;
			}
			let subject = '';
			subject = '/' + this.props.subjectUrl;
			let issue = '';
			issue = '/' + this.props.issueUrl;
			let uidPath = '/' + uid;
			record.created_dt = firebase.database.ServerValue.TIMESTAMP;
			let url = FirebaseConstant.basePath + '/quiz/simple_quiz' + uidPath + subject + issue;
			firebaseDatabase.ref(url).push(record);
		}
	}
	
	quizNextQuestion(data) {
		this.quizNext(data, 1);
	}
	
	quizSubmitQuestion(data) {
		this.quizNext(data, 2);
	}
	
	quiz_start(display=false)
	{
		this.setState({quizDisplay: display, quizPage: 0, quizPoints: 0, quizChoosenOption: null, quizIsCorrect: null, quizStatus: 'Pending', quizDetails: {total: 0, details: [], created_dt: null}});
	}

	render() {
		
		let issue = this.props.issue;
		if (!issue.quiz) {
			return null;	
		}

		let optionChoosen = parseInt(this.state.quizChoosenOption, 10);

		return (
			<div>
				{
					issue.quiz &&
					<div className="quiz divider">
						<h3>Simple Quiz</h3>
						{
							!this.state.quizDisplay &&
							<Button bsStyle="primary" className="form-control" onClick={() => {this.quiz_start(true)}}>Start Simple Quiz</Button>
						}
						{
							this.state.quizDisplay && 
							<div>
								{
									this.state.quizStatus === 'Completed' &&
									<SimpleQuizResults quizDetails={this.state.quizDetails} />
								}
								
								{
									(this.state.quizStatus === 'Pending' && issue.quiz[this.state.quizPage]) &&
									<div className="questions">
										<div className="question">Question {this.state.quizPage + 1}. {issue.quiz[this.state.quizPage].question}</div>
										<SimpleQuizAnsOptions opts={issue.quiz[this.state.quizPage].answerOptions} optionChoosen={optionChoosen} handleChooseOption={this.handleChooseOption} />
										
										
										<div className="divider">
											{
												issue.quiz[(this.state.quizPage + 1)] ?
												<Button bsStyle="primary" className="form-control" onClick={this.quizNextQuestion.bind(this, issue.quiz)}>Next Question</Button>
												:
												<Button bsStyle="primary" className="form-control" onClick={this.quizSubmitQuestion.bind(this, issue.quiz)}>Submit & See Results</Button>
											}
										</div>
									</div>
								}
							</div>
						}
						
						<div className="pastResulst">
						
						</div>
						
						
					</div>
				}
			</div>
		);
	}
}

export default SimpleQuiz;