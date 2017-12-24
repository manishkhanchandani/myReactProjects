import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Button, Modal} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import {connect} from 'react-redux';
import * as issuesAction from './IssuesAction.js';
import {getUID} from '../auth/AuthAction.js';
import {dynamicSort, timeAgo, processRecords} from '../../utilities/functions.js';
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
			results: null
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

	componentDidMount() {
		this.props.callGetBabyBarExamJson(this.props.match.params.subject);
		this.showRecord(this.props);
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
		console.log("url is ", url);
		var ref = firebaseDatabase.ref(url).limitToLast(500);
		ref.off();
	}
	
	addIssue(val, issueDetails, e) {
		let obj = this.state.issueSelected;

		let records = issueDetails.issues.filter((rec) => {
			return val.key === rec;
		});
		
		let isCorrect = false;
		if (records.length > 0) {
			isCorrect = true;
		}
		obj[val.key] = val;
		obj[val.key].isCorrect = isCorrect;
		
		
		if (!e.target.checked && obj[val.key]) {
			delete obj[val.key];
		}
		
		this.setState({issueSelected: obj});
	}
	
	submitIssue(issueDetails) {
		console.log('st is ', this.state);	
		console.log('issueDetails: ', issueDetails);
		let obj = {};
		obj.data = {};
		let totalPoints = 70;
		let issueSelected = this.state.issueSelected;
		let issueSpotting = this.state.issueSpotting;
		let issues = JSON.parse(JSON.stringify(issueSpotting.issues));
		if (Object.keys(issueSelected).length === 0) {
			totalPoints = 0;	
		} else {
			for (let i in issueSelected) {
				let pos = issues.indexOf(i);
				issues.splice(pos, 1);
				
				let isCorrect = true;
				if (pos === -1) {
					totalPoints = totalPoints - 5;
					isCorrect = false;
				}
				obj.data[i] = {
					name: issueSelected[i].name,
					isCorrect: isCorrect,
					missed: false
				};
			}

		}
		
		if (Object.keys(issues).length > 0) {
			for (let i in issues) {
				totalPoints = totalPoints - 5;
				obj.data[issues[i]] = {
					name: issueDetails[issues[i]].name,
					isCorrect: false,
					missed: true
				};
			}
		}
		if (totalPoints < 0) totalPoints = 0;
		
		obj.totalPoints = totalPoints;
		obj.subject = this.props.match.params.subject;
		obj.id = issueSpotting.id;
		obj.year = issueSpotting.year;
		
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
	}
	
	deleteRecord(id) {
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
		firebaseDatabase.ref(url).child(id).set(null);
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
		console.log('state is ', this.state);
		let subject = '';
		let terms = '';
		let data = null;
		let termsArray = [];
		if (this.props.issuesReducer && this.props.issuesReducer.baby_bar_exam) {
			subject = this.props.issuesReducer.baby_bar_exam.subject;
			data = this.props.issuesReducer.baby_bar_exam.data;
			terms = this.props.issuesReducer.baby_bar_exam.terms;
			
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
			console.log('r is ', this.state.results);
			let obj = processRecords(this.state.results, '-created_dt', null, [], 1, this.state.pageNumber, this.onActivePageChange.bind(this));
			myArrayConverted = obj.myArrayConverted;
			paginationProps = obj.paginationProps;
		}
		
		console.log('myArrayConverted: ', myArrayConverted);
		
		return (
			<div className="container">
				<h3>Issue Spotting :: <span> {subject}</span></h3>
				<div className="row">
					<div className="col-md-8">
						<div className="panel panel-primary">
							<div className="panel-heading"><b>Issue Spotting</b></div>
							<div className="panel-body">
								<select className="form-control" onChange={(e) => {this.setState({issueSpotting: JSON.parse(e.target.value)})}}>
									<option>Select Year</option>
									{
										data && 
										data.map((value, key) => {
											if (!value.year) {
												return null;	
											}
											const opt = JSON.stringify(value);
											return <option key={key} value={opt}>{value.year} / id: {value.id}</option>		  
										})
									}
								</select>
								<br />
								<Button bsStyle="primary" className="form-control" onClick={() => {this.setState({issueSpottingStarted: true})}}>Start Issue Spotting</Button>
							</div>
						</div>
						
						
						{
							this.state.issueSpottingStarted &&
							<div className="panel panel-primary">
								<div className="panel-heading"><b>Issue Spotting</b></div>
								<div className="panel-body">
									<div><b>Read the following hypo and try to choose all the issues. Total points is 100, you will get max 70 points if you answer all correct. And you will loose 5 to 10 points on each missing or wrong issue which is not on our list.</b></div>
									<hr />
									<div>{renderHTML(this.state.issueSpotting.hypo)}</div>
									<hr />
									<div><b>Choose from following issues:</b></div>
									<hr />
									{
										termsArray && 
										termsArray.map((value, key) => {
											let obj = JSON.stringify(value);
											return <div key={key}><input type="checkbox" value={obj} onClick={this.addIssue.bind(this, value, this.state.issueSpotting)} /> {value.name}</div>				
										})
									}
									<hr />
									<Button bsStyle="primary" className="form-control" onClick={this.submitIssue.bind(this, terms)}>Submit Spotting</Button>
								</div>
							</div>
						}
						
					</div>
					<div className="col-md-4">
						<div className="panel panel-primary">
							<div className="panel-heading"><b>Past Issue Spotting</b></div>
							<div className="panel-body">
							
								{
									myArrayConverted && 
									myArrayConverted.map((value, key) => {
										let date = new Date(value.created_dt);
										return <div key={key} className="panel panel-default">
											<div className="panel-heading"><b>{value.year} / ID: {value.id}</b><div className="pull-right">{value.dt}</div></div>
											<div className="panel-body">
												
												<b>You selected following options: </b><br /><br />
												{
													value.dataArray && 
													value.dataArray.map((value, key) => {
														let obj = JSON.stringify(value);
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
															<div> Points Deducted: <b>-5</b></div>
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
											<div className="panel-footer">Total Points: <b>{value.totalPoints}</b>
														<a href="" className="pull-right">Delete</a></div>
										</div>			  
									})
								}
								
								<Paginator {...paginationProps} />
								
							</div>
						</div>
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