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
import * as simpleQuizAction from '../simple-quiz/SimpleQuizAction.js';

import Paginator from '../../utilities/Paginator.js';
import {processRecords} from '../../utilities/functions.js';
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
			pageNumber: 1,
			show_past_answer: false,
			show_past_quiz: false
		};
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
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
		//this.props.callGetIssueAnswers(uid, this.props.match.params.subject, this.props.match.params.issue);
		//this.props.callGetSimpleQuiz(uid, this.props.match.params.subject, this.props.match.params.issue);
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
		console.log('props are: ', this.props);
		let subject = this.props.issuesReducer.subject;		
		let issue = this.props.issuesReducer.issue;
		let uid = getUID();
			
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

		if (this.props.simpleQuizReducer.simple_quiz_answers) {
			var {myArrayConverted, paginationProps} = processRecords(this.props.simpleQuizReducer.simple_quiz_answers, '-created_dt', null, [], 1, this.state.pageNumber, this.onActivePageChange.bind(this));
			console.log('myArrayConverted: ', myArrayConverted);
		} else {
			var myArrayConverted = null;
			var paginationProps = null;	
		}
		
		let sitePanelClass_1 = 'primary';
		let sitePanelClass_2 = 'primary';
			
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
								<div className="col-md-4">
									<div className={`panel panel-${sitePanelClass_1}`}>
										<div className="panel-heading"><b>Rule</b></div>
										<div className="panel-body">
											{renderHTML(issue.rule)}
										</div>
									</div>
									{
										issue.elements &&
										<div className={`panel panel-${sitePanelClass_1}`}>
											<div className="panel-heading"><b>Elements to Prove</b></div>
											<div className="panel-body">
												<ul>
													{
														issue.elements.map((value, key) => {
															return <li key={key}>{value}</li>							   
														})	
													}
												</ul>
											</div>
										</div>
									}
									{
										issue.description &&
										<div className={`panel panel-${sitePanelClass_1}`}>
											<div className="panel-heading"><b>Description</b></div>
											<div className="panel-body">
												{renderHTML(issue.description)}
											</div>
										</div>
									}
									{
										issue.elementsQuestions &&
										<div className={`panel panel-${sitePanelClass_1}`}>
											<div className="panel-heading"><b>Sample Essay Format</b></div>
											<div className="panel-body">
												{
													issue.elementsQuestions.map((value, key) => {
														return <span key={key}>{renderHTML(value)} </span>							   
													})	
												}
											</div>
											<div className="panel-footer">{issue.conclusion}</div>
										</div>
									}
									{
										issue.urls &&
										<div className={`panel panel-${sitePanelClass_1}`}>
											<div className="panel-heading"><b>External Links</b></div>
											<div className="panel-body">
												<ul>
													{
														issue.urls.map((value, key) => {
															return <li key={key}><a href={value.link} target="_blank">{value.title}</a></li>							   
														})	
													}
												</ul>
											</div>
										</div>
									}
									{
										issue.videos &&
										<div>
											<div className={`panel panel-${sitePanelClass_1}`}>
												<div className="panel-heading"><b>Videos</b></div>
												<div className="panel-body">
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
												</div>
											</div>
											<div>
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
										</div>
									}
								</div>
								<div className="col-md-4">
									
									{
										issue.sample_essays &&
										<div className={`panel panel-${sitePanelClass_1} sample_essays`}>
											<div className="panel-heading"><b>Sample Essays</b></div>
											<div className="panel-body">
												<ol>
													{
														issue.sample_essays.map((value, key) => {
															return <li key={key}>
																<b>Hypo: </b> {renderHTML(value.hypo)}
																<div className="divider"><b>SOLUTION: </b></div>
																<div className="divider">{renderHTML(value.explanation)}</div>
															
															</li>							   
														})	
													}
												</ol>
											</div>
										</div>
									}
									
									
									
									{
										issue.essays &&
										<div className={`panel panel-${sitePanelClass_1} essays` }>
											<div className="panel-heading">Essays To Practice</div>
											<div className="panel-body">
												<div>Click on each of the following hypo and try to write the essay related to "{issue.name}" only in the following textarea.<br /></div>
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
										</div>
									}
									
									
									
									{
										issue.mbe &&
										<div className={`panel panel-${sitePanelClass_1} mbe` }>
										<div className="panel-heading">MBE Ideas</div>
										<div className="panel-body">
											<div>Click on each of the following Ideas and try to understand the idea related to "{issue.name}".</div>
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
										
										</div>
									}
									
									
									
									<SimpleQuiz issue={issue} subjectUrl={this.props.match.params.subject} issueUrl={this.props.match.params.issue} />
									
									
									
									
									
									
								</div>
								
								<div className="col-md-4">
									{
										!this.state.show_past_answer &&
										<div><a href="" onClick={(e) => {e.preventDefault(); this.setState({show_past_answer: true}); this.props.callGetIssueAnswers(uid, this.props.match.params.subject, this.props.match.params.issue);}}>Show Past Essay Answer</a></div>
									}
									{
										this.state.show_past_answer &&
										<div>
											<div><a href="" onClick={(e) => {e.preventDefault(); this.setState({show_past_answer: false}); }}>Hide Past Essay Answer</a></div>
											{
												this.props.issuesReducer.issue_answers &&
												<div>
													<h3>Your Essay Answers</h3>
												{
													this.props.issuesReducer.issue_answers.map((value, key) => {
														return <div key={key} className={`panel panel-${sitePanelClass_1}`}>
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
										</div>
									}
									
									
									<div className="pastResults">
										{
											!this.state.show_past_quiz &&
											<div><a href="" onClick={(e) => {e.preventDefault(); this.setState({show_past_quiz: true});this.props.callGetSimpleQuiz(uid, this.props.match.params.subject, this.props.match.params.issue);}}>Show Past Quiz</a></div>
										}
										{
											this.state.show_past_quiz &&
											<div>
												<div><a href="" onClick={(e) => {e.preventDefault(); this.setState({show_past_quiz: false});}}>Hide Past Quiz</a></div>
												<div>
												{
													this.props.simpleQuizReducer.simple_quiz_answers && 
													<div>
														<h3>Past Quiz Results</h3>
														<Paginator {...paginationProps} />
														{
															myArrayConverted.map((value, key) => {
																return <SimpleQuizResults key={key} quizDetails={value} pastResults={true} />													  
															})
														}
														
														<hr />
														<Paginator {...paginationProps} />
													</div>
												}
												</div>
											</div>
										}
									</div>
									
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
		issuesReducer: state.IssuesReducer,
		simpleQuizReducer: state.SimpleQuizReducer
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
		},
		callGetSimpleQuiz: (u=null, s=null, i=null) => {
			if (!u || !s || !i) {
				return;	
			}
			dispatch(simpleQuizAction.getSimpleQuizAnswers(u, s, i));	
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EssayIssues));