import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Button, Modal} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getUID} from '../auth/AuthAction.js';
import * as issuesAction from './IssuesAction.js';
import {Link} from 'react-router-dom';
import './Issues.css';

import SimpleQuiz from '../simple-quiz/SimpleQuiz.js';
import SimpleQuizResults from '../simple-quiz/SimpleQuizResults.js';


class EssayIssues extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			video: null,
			selectedEssay: null,
			selectedMBE: null,
			deleteIssueModal: false,
			deleteIssueModalData: false,
			
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
	
	componentDidMount() {
		let uid = getUID();
		this.props.callGetSubjectsJson(this.props.match.params.subject);
		this.props.callGetIssueJson(this.props.match.params.subject, this.props.match.params.issue);
		this.props.callGetIssueAnswers(uid, this.props.match.params.subject, this.props.match.params.issue);
	}
	
	submitEssay() {
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
		
		var obj = {};
		obj.text = this.state.selectedEssay.text;
		obj.key = this.state.selectedEssay.key;
		obj.year = this.state.selectedEssay.year;
		obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
		var url = FirebaseConstant.basePath + '/quiz/issues_answers' + uidPath + subject + issue;
		firebaseDatabase.ref(url).push(obj);
		this.setState({selectedEssay: null});
		this.props.callGetIssueAnswers(uid, this.props.match.params.subject, this.props.match.params.issue);
	}
	
	updateEssayText(e) {
		this.setState(
			{
				selectedEssay: 
				{
					...this.state.selectedEssay, 
					text: e.target.value
				}
			}
		);	
	}
	
	deleteRecord() {
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
		var url = FirebaseConstant.basePath + '/quiz/issues_answers' + uidPath + subject + issue;
		firebaseDatabase.ref(url).child(this.state.deleteIssueModalData.id).set(null);
		this.props.callGetIssueAnswers(uid, this.props.match.params.subject, this.props.match.params.issue);
		return this.close();
		
	}
	
	close() {
		this.setState({deleteIssueModal: false, deleteIssueModalData: null});
	}

	render() {		
		let subject = this.props.issuesReducer.subject;		
		let issue = this.props.issuesReducer.issue;
			
		const opts = {
		  playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 1
		  }
		};
		
		let next = null;
		if (subject && issue && issue.next && issue.next.key && issue.next.subject) {
			next = '/essays/issues/'+issue.next.subject+'/'+issue.next.key;
		}
		
		
		let previous = null;
		if (subject && issue && issue.previous && issue.previous.key && issue.previous.subject) {
			previous = '/essays/issues/'+issue.previous.subject+'/'+issue.previous.key;
		}
		
		let optionChoosen = parseInt(this.state.quizChoosenOption, 10);
		
		console.log('this state1 is ', this.state);
			
		return (
			<div className="issues">
				
				
				
				<div className="row">						
					<div className="col-md-12">
						<h3>{
								(subject && subject.key) &&
								<span>{subject.name}</span>
							}
							{
								issue && 
								<span> :: {issue.name}</span>
							}
						</h3>
						{
							issue &&
							<div className="row myFavText">
								<div className="col-md-6">
									<div>
										<b>Rule: </b> {renderHTML(issue.rule)}
									</div>
									{
										issue.elements &&
										<div className="divider">
											<b>Elements to Prove: </b> 
											<ul>
												{
													issue.elements.map((value, key) => {
														return <li key={key}>{value}</li>							   
													})	
												}
											</ul>
										</div>
									}
									{
										issue.description &&
										<div className="divider">
											<b>Description: </b> 
											<div>{renderHTML(issue.description)}</div>
										</div>
									}
									{
										issue.elementsQuestions &&
										<div className="divider">
											<b>Sample Essay Format: </b> 
											<div>
												{
													issue.elementsQuestions.map((value, key) => {
														return <span key={key}>{renderHTML(value)} </span>							   
													})	
												}
											</div>
											<div className="divider">
												{issue.conclusion}
											</div>
										</div>
									}
									{
										issue.urls &&
										<div className="divider">
											<div>
												<b>External Links: </b> 
											</div>
											<ul>
												{
													issue.urls.map((value, key) => {
														return <li key={key}><a href={value.link} target="_blank">{value.title}</a></li>							   
													})	
												}
											</ul>
										</div>
									}
									{
										issue.videos &&
										<div className="divider">
											<b>Videos: </b> 
											<ul>
												{
													issue.videos.map((value, key) => {
														return <li key={key}><a href="" onClick={(e) => {e.preventDefault(); this.setState({video: value})}}>{value.title}</a></li>							   
													})	
												}
												
												{
													this.state.video &&
													<li key="close"><a href="" onClick={(e) => {e.preventDefault(); this.setState({video: null})}}>Close Video</a></li>
												}
											</ul>
											{
												this.state.video &&
												<div className="embed-responsive embed-responsive-16by9">
												  <YouTube
													videoId={this.state.video.key}
													opts={opts}
													className="embed-responsive-item"
												  />
												</div>
											}
										</div>
									}
								</div>
								<div className="col-md-6">
									{
										issue.essays &&
										<div className="essays">
											<div>
												<b>Essays To Practice: </b> Click on each of the following hypo and try to write the essay related to "{issue.name}" only in the following textarea.
											</div>
											<ol>
												{
													issue.essays.map((value, key) => {
														var obj = value;
														obj.text = '';
														obj.key = key;
														return <li key={key}><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedEssay: obj});}}>{value.year}</a></li>							   
													})	
												}
												{
													this.state.selectedEssay &&
													<li key="close"><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedEssay: null})}}>Close Textarea</a></li>
												}
											</ol>
											{
												this.state.selectedEssay &&
												<div>
													<div className="divider">
														<b>Year: </b> {this.state.selectedEssay.year}
													</div>
													<div className="divider">
														<b>Hypo: </b> {renderHTML(this.state.selectedEssay.hypo)}
													</div>
													<div className="divider">
													<textarea className="form-control" rows="10" value={this.state.selectedEssay.text} onChange={this.updateEssayText.bind(this)}></textarea>
													</div>
													<div className="divider">
													<Button className="form-control" bsStyle="primary" onClick={this.submitEssay.bind(this)}>Submit</Button>
													</div>
												</div>
											}
										</div>
									}
									
									
									
									{
										issue.mbe &&
										<div className="mbe">
											<div>
												<b>MBE Ideas: </b> Click on each of the following Ideas and try to understand the idea related to "{issue.name}".
											</div>
											<ul>
												{
													issue.mbe.map((value, key) => {
														return <li key={key}><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedMBE: value});}}>{value.name}</a></li>							   
													})	
												}
												{
													this.state.selectedMBE &&
													<li key="close"><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedMBE: null})}}>Close Idea</a></li>
												}
											</ul>
											{
												this.state.selectedMBE &&
												<div>
													<div className="divider">
														Name:  <b>{this.state.selectedMBE.name}</b>
													</div>
													<div className="divider">
														<b>Description: </b> {renderHTML(this.state.selectedMBE.description)}
													</div>
												</div>
											}
										</div>
									}
									
									{
										this.props.issuesReducer.issue_answers &&
										<div>
											<h3>Your Answers</h3>
										{
											this.props.issuesReducer.issue_answers.map((value, key) => {
												return <div key={key} className="panel panel-primary">
												  <div className="panel-heading">
													<h3 className="panel-title">{value.year} (For Question {value.key + 1})</h3>
												  </div>
												  <div className="panel-body">
													{value.text}
												  </div>
												  <div className="panel-footer">{value.dt}<span className="pull-right"><a href="" onClick={(e) => {e.preventDefault(); this.setState({deleteIssueModal: true, deleteIssueModalData: value});}}>Delete</a></span></div>
												</div>						  									   
											})
										}
											<Modal show={this.state.deleteIssueModal} onHide={this.close.bind(this)}>
												<Modal.Header closeButton>
													<Modal.Title>Confirmation</Modal.Title>
												</Modal.Header>
												<Modal.Body>
													<h4>Delete Record For 
													{
														this.state.deleteIssueModalData && 
															<span>
																{this.state.deleteIssueModalData.year} (For Question {this.state.deleteIssueModalData.key + 1})
															</span> 
													} </h4>
													<p>Do you really want to delete this record? You wont be able to recover it later?</p>
												</Modal.Body>
												<Modal.Footer>
													<Button onClick={this.deleteRecord.bind(this)}>Delete Record</Button>
												</Modal.Footer>
											</Modal>
										</div>
									}
									
									
									
									<SimpleQuiz issue={issue} subjectUrl={this.props.match.params.subject} issueUrl={this.props.match.params.issue} />
									
									
									
									
								</div>
							</div>
						}
					</div>
				</div>
				
				
				<div className="row">	
					<br />
					<br />
					<hr />
					<br />					
					<div className="col-md-6">
						{
							previous &&
							<Link className="btn btn-primary form-control" to={previous}>Previous</Link>
						}
					</div>						
					<div className="col-md-6">
						{
							next &&
							<Link className="btn btn-primary form-control" to={next}>Next {issue.next.name}</Link>
						}
					</div>
					<br />
					<br />
				</div>
				
				
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issuesReducer: state.IssuesReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callGetIssueAnswers: (u=null, s=null, i=null) => {
			if (!u || !s || !i) {
				return;	
			}
			dispatch(issuesAction.getIssueAnswers(u, s, i));	
		},
		callGetSubjectsJson: (subject=null) => {
			dispatch(issuesAction.getSubjectsJson(dispatch, subject));
		},
		callGetIssueJson: (subject=null, issue=null) => {
			dispatch(issuesAction.selectIssueJson(dispatch, subject, issue));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EssayIssues));