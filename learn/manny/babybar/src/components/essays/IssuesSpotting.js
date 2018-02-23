import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Button, Modal} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import {connect} from 'react-redux';
import * as issuesAction from './IssuesAction.js';
import {getUID} from '../auth/AuthAction.js';
import {timeAgo, processRecords} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';
import {Alert} from 'react-bootstrap';

class IssuesSpotting extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			isPageSubject: this.props.match.params.subject,
			issueSpotting: null,
			issueSpottingStarted: false,
			issueSelected: {},
			pageNumber: 1,
			results: null,
			deleteIssueModal: false,
			deleteIssueDetail: null,
			checked: {},
			displayAnswers: false
		};
	}

	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	resetVars()
	{
		
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.subject !== this.state.isPageSubject) {
			nextProps.callGetBabyBarExamJson(nextProps.match.params.subject);
			
			this.setState({isPageSubject: nextProps.match.params.subject, issueSpotting: null, issueSpottingStarted: false, issueSelected: {}, pageNumber: 1, results: null});
			
			this.showRecord(nextProps);
		}
	}

	resetChecked() {
		let checked = {};
		for (let i = 0; i < 100; i++) {
			checked[i] = false;
		}
		this.setState({checked: checked, issueSelected: {}});
	}

	componentDidMount() {
		this.props.callGetBabyBarExamJson(this.props.match.params.subject);
		this.showRecord(this.props);
		this.resetChecked();
	}
	
	componentWillUnmount() {
		let uid = getUID();
		if (!uid) {
			return;
		}
		
		if (!this.props.match.params.subject) {
			return;
		}
		let uidPath = '/' + uid;
		let subject = '/' + this.props.match.params.subject;
		var url = FirebaseConstant.basePath + '/quiz/issue_spotting' + uidPath + subject;
		var ref = firebaseDatabase.ref(url).limitToLast(500);
		ref.off();
	}
	
	addIssue(val, issueDetails, key, e) {
		let obj = this.state.issueSelected;

		let record = issueDetails.issues[val.key];
		
		let isCorrect = false;
		if (record) {
			isCorrect = true;
		}
		obj[val.key] = val;
		obj[val.key].isCorrect = isCorrect;
		
		
		if (!e.target.checked && obj[val.key]) {
			delete obj[val.key];
		}
		
		let checked = this.state.checked;
		checked[key] = e.target.checked;

		this.setState({issueSelected: obj, checked: checked});
	}
	
	submitIssue(issueDetails) {
		this.setState({displayAnswers: true});
		let obj = {};
		obj.data = {};
		let totalPoints = 70;
		let issueSelected = this.state.issueSelected;
		let issueSpotting = this.state.issueSpotting;
		let issues = JSON.parse(JSON.stringify(issueSpotting.issues));
		console.log('issueDetails: ', issueDetails);
		console.log('issueSpotting: ', issueSpotting);
		console.log('issues: ', issues);
		
		if (Object.keys(issueSelected).length === 0) {
			totalPoints = 0;	
		} else {
			for (let i in issueSelected) {
				let isCorrect = true;
				let pos = issues[i];
				let point = '+++';
				if (pos) {
					delete issues[i];
				} else {
					totalPoints = totalPoints - 2;
					isCorrect = false;
					point = -2;
				}
				obj.data[i] = {
					name: issueSelected[i].title,
					isCorrect: isCorrect,
					missed: false,
					point: point
				};
			}

		}
		
		if (Object.keys(issues).length > 0) {
			for (let i in issues) {
				totalPoints = totalPoints - 5;
				obj.data[i] = {
					name: issueDetails[i].title,
					isCorrect: false,
					missed: true,
					point: -5
				};
			}
		}
		if (totalPoints < 0) totalPoints = 0;
		
		obj.totalPoints = totalPoints;
		obj.subject = this.props.match.params.subject;
		obj.id = issueSpotting.id;
		obj.year = issueSpotting.reference;
		
		let uid = getUID();
		if (!uid) {
			return;
		}
		
		if (!this.props.match.params.subject) {
			return;
		}

		let uidPath = '/' + uid;
		let subjectUrl = '';
		subjectUrl = '/' + this.props.match.params.subject;
		obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
		
		var url = FirebaseConstant.basePath + '/quiz/issue_spotting' + uidPath + subjectUrl;
		firebaseDatabase.ref(url).push(obj);
		
		this.resetChecked();
	}
	
	deleteRecord(val) {
		let uid = getUID();
		if (!uid) {
			return;
		}
		
		if (!this.props.match.params.subject) {
			return;
		}

		let uidPath = '/' + uid;
		let subjectUrl = '';
		subjectUrl = '/' + this.props.match.params.subject;		
		var url = FirebaseConstant.basePath + '/quiz/issue_spotting' + uidPath + subjectUrl;
		firebaseDatabase.ref(url).child(val._id).set(null);
		this.close();
	}
	
	close() {
		this.setState({deleteIssueModal: false, deleteIssueData: null});
	}
	
	showRecord(props) {
		let uid = getUID();
		if (!uid) {
			return;
		}
		
		if (!props.match.params.subject) {
			return;
		}
		let uidPath = '/' + uid;
		let subject = '/' + props.match.params.subject;
		var url = FirebaseConstant.basePath + '/quiz/issue_spotting' + uidPath + subject;
		var ref = firebaseDatabase.ref(url).limitToLast(500);
		ref.off();
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result) {
				this.setState({results: null});
				return;
			}

			var myArray = [];
			for (var key in result) {
				var obj = result[key];
				obj.dt = timeAgo(obj.created_dt);
				obj._id = key;
				let objArray = [];
				for (let i in obj.data) {
					objArray.push({...obj.data[i], key: i});
				}
				obj.dataArray = objArray;
				myArray.push(obj);
			}
			this.setState({results: myArray});
		});	
	}
	
	
	render() {
		let subject = '';
		let terms = '';
		let data = null;
		let termsArray = [];
		let recordDetails = null;
		if (this.props.issuesReducer && this.props.issuesReducer.baby_bar_exam && this.props.issuesReducer.baby_bar_exam[this.props.match.params.subject]) {
			recordDetails = this.props.issuesReducer.baby_bar_exam[this.props.match.params.subject];

			subject = this.props.issuesReducer.baby_bar_exam.subject;
			data = recordDetails.exams;
			terms = recordDetails.issues;
			
			if (terms) {
				for (let i in terms) {
					let obj = terms[i];
					obj.key = i;
					termsArray.push(obj);
				}
			}
		}
		
		var myArrayConverted = null;
		var paginationProps = null;	
		if (this.state.results) {
			let obj = processRecords(this.state.results, '-created_dt', null, [], 1, this.state.pageNumber, this.onActivePageChange.bind(this));
			myArrayConverted = obj.myArrayConverted;
			paginationProps = obj.paginationProps;
		}

		let issueUrl = '/essays/issues/' + this.props.match.params.subject;
		
		return (
			<div className="container">
				<h3>Issue Spotting :: <span> {subject}</span></h3>
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-primary">
							<div className="panel-heading"><b>Issue Spotting</b></div>
							<div className="panel-body">
								<select className="form-control" onChange={(e) => {if (!e.target.value) {return;} this.setState({displayAnswers: false, issueSpotting: JSON.parse(e.target.value)})}}>
									<option value="">Select Year</option>
									{
										data && 
										data.map((value, key) => {
											if (!value.reference) {
												return null;	
											}
											const opt = JSON.stringify(value);
											return <option key={key} value={opt}>{value.reference} / id: {value.id}</option>		  
										})
									}
								</select>
								<br />
								<Button bsStyle="primary" className="form-control" onClick={() => {if(!this.state.issueSpotting) { return false; } this.resetChecked(); this.setState({issueSpottingStarted: true})}}>Start Issue Spotting</Button>
							</div>
						</div>
					</div>
				</div>
						
				
				<div className="row">
					<div className="col-md-8">
						{
								this.state.issueSpottingStarted &&
								<div className="row">
									<div className="col-md-7">
										<div className="panel panel-warning">
											<div className="panel-heading"><b>Issue Spotting</b></div>
											<div className="panel-body">
												<div><b>Read the following hypo and try to choose all the issues mentioned from list on right side. Total points is 100, you will get max 70 points if you answer all correct. And you will loose 5 points on each missing and 2 points on each wrong issue which is not on our list.</b></div>
												<hr />
												<div>{renderHTML(this.state.issueSpotting.essay)}</div>
											</div>
										</div>
										{
											(this.state.displayAnswers && this.state.issueSpotting.sampleAnswers) &&
											<div>
												{
													this.state.issueSpotting.sampleAnswers.map((value, key) => {
														return <div key={key} className="panel panel-warning">
														<div className="panel-heading">Sample Answer {key + 1}</div>
															<div className="panel-body">
																{renderHTML(value)}
															</div>
														</div>
																								
													})
												}
											</div>
										}
										
										
										
									</div>
									<div className="col-md-5">
										
										
										
										<div className="panel panel-warning">
											<div className="panel-heading"><b>Choose from following issues</b></div>
											<div className="panel-body">
											{
												termsArray && 
												termsArray.map((value, key) => {
													return <div key={key}><input type="checkbox" onClick={this.addIssue.bind(this, value, this.state.issueSpotting, key)} value={key} checked={this.state.checked[key]} /> <a href={`${issueUrl}/${value.key}`} target="_blank">{value.title}</a></div>				
												})
											}
											<hr />
											<Button bsStyle="primary" className="form-control" onClick={this.submitIssue.bind(this, terms)}>Submit Spotting</Button>
											{
												this.state.issueSpotting.sampleAnswers && 
												<div>
												<br /><br />
												<a href="" onClick={(e) => {e.preventDefault(); this.setState({displayAnswers: true});}}>Show Past Answers</a>
												</div>
											}
											
											
											
											
											</div>
										</div>
										
										
										
										
									</div>
								</div>
							}
					
					
					
					
					
					
					
					
					
					
					
					</div>
					<div className="col-md-4">
					
					
						{
							myArrayConverted && 
							<div className="row">
								<div className="col-md-12">
									<div className="panel panel-success">
										<div className="panel-heading"><b>Past Issue Spotting</b></div>
										<div className="panel-body">
										
											{
												myArrayConverted.map((value, key) => {
													let date = new Date(value.created_dt);
													return <div key={key} className="panel panel-default">
														<div className="panel-heading"><b>{value.year} / ID: {value.id}</b><div className="pull-right">{value.dt}</div></div>
														<div className="panel-body">
															
															<b>You selected following options: </b><br /><br />
															{
																value.dataArray && 
																value.dataArray.map((value, key) => {
																	return <div key={key}><b>{value.name}</b><br />
																	Is Correct: 
																	{
																		value.isCorrect ?
																		<span><b>Yes</b></span>
																		:
																		<span><b>No</b></span>
																	}
																	{
																		!value.isCorrect && 
																		<div> Points Deducted: <b>{value.point}</b></div>
																	}
																	
																	{
																		value.missed && 
																		<Alert bsStyle="info">
																		You Missed this issue
																	  </Alert>
																	}
																	
																	{
																		(!value.isCorrect && !value.missed) && 
																		<Alert bsStyle="danger">
																		Wrong Issue
																	  </Alert>
																	}
																	<hr />
																	</div>				
																})
															}
															
															<div>Created On: <b>{date.toString()}</b></div>
														</div>
														<div className="panel-footer"><small>Total Points: <b>{value.totalPoints}</b>
														
														{
															value.totalPoints >= 60 ?
															<span> / You Passed</span> :
															<span> / You Failed</span>
														}
																	<a href="" className="pull-right" onClick={(e) => {e.preventDefault(); this.setState({deleteIssueModal: true, deleteIssueDetail: value});}}>Delete</a></small></div>
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
														this.state.deleteIssueDetail && 
															<span>
																{this.state.deleteIssueDetail.year} / ID: {this.state.deleteIssueDetail.id}
															</span> 
													} </h4>
													<p>Do you really want to delete this record? You wont be able to recover it later?</p>
												</Modal.Body>
												<Modal.Footer>
													<Button onClick={this.deleteRecord.bind(this, this.state.deleteIssueDetail)}>Delete Record</Button>
												</Modal.Footer>
											</Modal>
											
											<Paginator {...paginationProps} />
											
										</div>
									</div>
								</div>
							</div>
						}
						
						
						
						
					</div>
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
		callGetBabyBarExamJson: (subject=null) => {
			if (!subject) return;
			dispatch(issuesAction.getBabyBarExamJson(subject));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesSpotting);