import React, {Component} from 'react';

import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Button, Modal} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getUID, getUsersObj} from '../auth/AuthAction.js';
import * as issuesAction from './IssuesAction.js';
import {Link} from 'react-router-dom';
import './Issues.css';
import * as simpleQuizAction from '../simple-quiz/SimpleQuizAction.js';

import Paginator from '../../utilities/Paginator.js';
import {processRecords, activityTracker} from '../../utilities/functions.js'; //, essayPoints, mbePoints
import SimpleQuiz from '../simple-quiz/SimpleQuiz.js';
import SimpleQuizResults from '../simple-quiz/SimpleQuizResults.js';
import IssuesBarExam from './IssuesBarExam.js';

import IssuesRule from './IssuesRule.js';
import LearnRule from './LearnRule.js';

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
			show_past_quiz: false,
			isPageSubject: this.props.match.params.subject,
			isPageIssue: this.props.match.params.issue
		};
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	componentDidMount() {
		window.scrollTo(0, 0);
		let uid = getUID();

		if (!this.props.issuesReducer.subjects) {
			this.props.callGetSubjectsJson(this.props.match.params.subject);
		}
		if (!(this.props.issuesReducer && this.props.issuesReducer.issue && this.props.issuesReducer.issue[this.props.match.params.subject] && this.props.issuesReducer.issue[this.props.match.params.subject][this.props.match.params.issue])) {
			this.props.callGetIssueJson(this.props.match.params.subject, this.props.match.params.issue);
		}
		if (!(this.props.issuesReducer.baby_bar_exam && this.props.issuesReducer.baby_bar_exam[this.props.match.params.subject])) {
			this.props.callGetBabyBarExamJson(this.props.match.params.subject);
		}
		this.props.f_babybarRules(uid, this.props.match.params.subject, this.props.match.params.issue);

		//tracking activity
		activityTracker('pageTracker', this.props.match.url);
	
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.subject !== this.state.isPageSubject || nextProps.match.params.issue !== this.state.isPageIssue) {
			window.scrollTo(0, 0);
			let uid = getUID();

			if (!nextProps.issuesReducer.subjects || (nextProps.match.params.subject && nextProps.match.params.subject !== nextProps.issuesReducer.subject.key)) {
				nextProps.callGetSubjectsJson(nextProps.match.params.subject);
			}
			if (!(nextProps.issuesReducer && nextProps.issuesReducer.issue && nextProps.issuesReducer.issue[nextProps.match.params.subject] && nextProps.issuesReducer.issue[nextProps.match.params.subject][nextProps.match.params.issue])) {
				nextProps.callGetIssueJson(nextProps.match.params.subject, nextProps.match.params.issue);
			}
			if (!(nextProps.issuesReducer.baby_bar_exam && nextProps.issuesReducer.baby_bar_exam[nextProps.match.params.subject])) {
				nextProps.callGetBabyBarExamJson(nextProps.match.params.subject);
			}
			nextProps.f_babybarRules(uid, nextProps.match.params.subject, nextProps.match.params.issue);
			
			this.setState({isPageSubject: nextProps.match.params.subject, isPageIssue: nextProps.match.params.issue, show_past_answer: false, show_past_quiz: false});
			//tracking activity
			activityTracker('pageTracker', this.props.match.url);

		}
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
		let issue = null;
		if (this.props.issuesReducer.issue && this.props.issuesReducer.issue[this.props.match.params.subject] && this.props.issuesReducer.issue[this.props.match.params.subject][this.props.match.params.issue]) {
			issue = this.props.issuesReducer.issue[this.props.match.params.subject][this.props.match.params.issue];
		}
		let uid = getUID();
		let userObj = getUsersObj();

		var quizExtra = null;
		if ((userObj.access_level === 'admin' || userObj.access_level === 'admin2' || userObj.access_level === 'superadmin')  && issue) {
			quizExtra = [];
			let len = (issue.quiz) ? issue.quiz.length : 0;
			var counter = len + 1;
			if (issue.mbe) {
				for (let x1 = 0; x1 < issue.mbe.length; x1++) {
					if (issue.mbe[x1].examples && issue.mbe[x1].examples.length > 0) {
						for (let x2 = 0; x2 < issue.mbe[x1].examples.length; x2++) {
							let obj = issue.mbe[x1].examples[x2];
							obj.id = counter;
							quizExtra.push(obj);
							counter++;
						}
					}
				}
			}
			
			let children = quizExtra;
			if (issue.quiz && issue.quiz.length > 0) {
				children = issue.quiz.concat(quizExtra);
				quizExtra = children;
			}
		}
		
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

		var myArrayConverted = null;
		var paginationProps = null;	
		if (this.props.simpleQuizReducer.simple_quiz_answers) {
			let obj = processRecords(this.props.simpleQuizReducer.simple_quiz_answers, '-created_dt', null, [], 1, this.state.pageNumber, this.onActivePageChange.bind(this));
			myArrayConverted = obj.myArrayConverted;
			paginationProps = obj.paginationProps;
		}
		
		let sitePanelClass_1 = 'primary';
		let sitePanelClass_2 = 'primary';
		let sitePanelClass_3 = 'primary';
		let sitePanelClass_4 = 'primary';
				
		let currentIssueRules = null;
		if (this.props.match.params.subject && this.props.match.params.issue) {
			//getting localstorage
			let key = 'rules_'+uid+'_'+this.props.match.params.subject+'_'+this.props.match.params.issue;
			let value = localStorage.getItem(key);	
			if (value) {
				currentIssueRules = JSON.parse(value);
			}
			
		}

		if (this.props.issuesReducer.baby_bar_rules && this.props.issuesReducer.baby_bar_rules[this.props.match.params.subject] && this.props.issuesReducer.baby_bar_rules[this.props.match.params.subject][this.props.match.params.issue]) {
			currentIssueRules = this.props.issuesReducer.baby_bar_rules[this.props.match.params.subject][this.props.match.params.issue];
		}
		
		
		
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
									<IssuesRule currentIssueRules={currentIssueRules} s={this.props.match.params.subject} i={this.props.match.params.issue} frontContent={issue.name} />
									{
										issue.elements &&
										<div className={`panel panel-${sitePanelClass_2}`}>
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
										<div className={`panel panel-${sitePanelClass_3}`}>
											<div className="panel-heading"><b>Description</b></div>
											<div className="panel-body">
												{renderHTML(issue.description)}
											</div>
										</div>
									}
									{
										issue.elementsQuestions &&
										<div className={`panel panel-${sitePanelClass_4}`}>
											<div className="panel-heading"><b>Sample Essay Format</b></div>
											<div className="panel-body">
												{
													issue.elementsQuestions.map((value, key) => {
														return <span key={key}>{renderHTML(value)} </span>							   
													})	
												}
											</div>
											{
												issue.conclusion && 
												<div className="panel-footer">{renderHTML(issue.conclusion)}</div>
											}
										</div>
									}
									{
										issue.sample_essays &&
										<div className={`panel panel-${sitePanelClass_3} sample_essays`}>
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
											<div className={`panel panel-${sitePanelClass_2}`}>
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
									
									
									
									
									
									
									<IssuesBarExam subject={this.props.match.params.subject} issue={this.props.match.params.issue} issuesReducer={this.props.issuesReducer} issueDetails={issue}/>
									
									{/*
										issue.essays &&
										<div className={`panel panel-${sitePanelClass_4} essays` }>
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
									*/}
									
									
									
									{
										((userObj.access_level === 'admin' || userObj.access_level === 'admin2' || userObj.access_level === 'superadmin') && issue.mbe) &&
										<div className={`panel panel-${sitePanelClass_1} mbe` }>
										<div className="panel-heading">MBE Ideas</div>
										<div className="panel-body">
											<div>Click on each of the following Ideas and try to understand the idea related to "{issue.name}".</div>
											<ul>
												{
													issue.mbe.map((value, key) => {
														return <li key={key}><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedMBE: value});}}>{value.name}</a>
														{
															(this.state.selectedMBE && this.state.selectedMBE.key === value.key) &&
															<div>
																<a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedMBE: null})}}>Close Idea</a>
																<div className="divider">
																	Name:  <b>{this.state.selectedMBE.name}</b>
																</div>
																<div className="divider">
																	<b>Description: </b> {renderHTML(this.state.selectedMBE.description)}
																</div>
															</div>
														}
														
														</li>							   
													})	
												}
											</ul>
										</div>
										
										</div>
									}
									
									
									
									<SimpleQuiz issue={issue} quizExtra={quizExtra} subjectUrl={this.props.match.params.subject} issueUrl={this.props.match.params.issue} />
									
									
									
									
									
									
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
															<h3 className="panel-title">{value.year} (ID: {value.qid})</h3>
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
																return <SimpleQuizResults key={key} quizDetails={value} pastResults={true} callGetSimpleQuiz={this.props.callGetSimpleQuiz} onActivePageChange={this.onActivePageChange.bind(this)} />													  
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
									
									
									<LearnRule subject={this.props.match.params.subject} issue={this.props.match.params.issue} />
									
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
		callGetBabyBarExamJson: (subject=null) => {
			if (!subject) return;
			dispatch(issuesAction.getBabyBarExamJson(subject));
		},
		callGetSimpleQuiz: (u=null, s=null, i=null) => {
			if (!u || !s || !i) {
				return;	
			}
			dispatch(simpleQuizAction.getSimpleQuizAnswers(u, s, i));	
		},
		f_babybarRules: (u=null, s=null, i=null) => {
			if (!u || !s || !i) {
				return;	
			}
			dispatch(issuesAction.babybarRules(u, s, i));	
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EssayIssues));