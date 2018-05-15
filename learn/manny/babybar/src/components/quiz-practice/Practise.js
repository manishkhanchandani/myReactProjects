import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getUID, getUsersObj} from '../auth/AuthAction.js';
//import {Redirect} from 'react-router-dom';
import {getRandomizer, processRecords, timeAgo, activityTracker} from '../../utilities/functions.js';

import Paginator from '../../utilities/Paginator.js';
import renderHTML from 'react-render-html';
import SimpleQuizAnsOptions from '../simple-quiz/SimpleQuizAnsOptions.js';
import '../simple-quiz/SimpleQuiz.css';
import Loader from '../Loader/Loader.js';
import Clock2 from '../clock1/Clock2.js';

import {changeStartTime} from '../essays/IssuesAction.js';
import {connect} from 'react-redux';

const category = {
	"27": "S Contracts",
	"28": "S Criminal",
	"29": "S Torts",
	"44": "Contracts",
	"45": "Criminal",
	"46": "Torts",
	"47": "FYLS 1980 Exam",
	"50": "QA Contracts",
	"51": "QA Criminal",
	"52": "QA Torts"
};

/*
class Help extends Component {
	render() {
		return (
			<div>
				<br />
				<div className="form-group">
					<label>Subject</label>
					<select className="form-control" >
						<option value="">Select</option>
						<option value="contracts">Contracts</option>
						<option value="ucc">UCC</option>
						<option value="criminal">Criminal</option>
						<option value="torts">Torts</option>
					</select>
				</div>
				<div className="form-group">
					<label>Issue</label>
					<input className="form-control" type="text"  />
				</div>
				<br />
			</div>
		)	
	}
}
*/
class QuizPractice extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			categories: null,
			category: null,
			number: 33,
			orderby: 2,
			repeat: 1,
			questions: null,
			userAnswered: null,
			finalQuestionList: null,
			pageNumber: 1,
			quizChoosenOption: {},
			score: 0,
			answered: 0,
			loading: false,
			filterTerm: '',
			seconds_assigned: 0,
			uniqueID: null,
			qUid: null,
			current: null,
			answers: null,
			startNumber: 1
			
		};
	}
	
	onActivePageChange(page) {
		//localStorage.setItem('pageNumber', page);
		let uniqueID = localStorage.getItem('uniqueID');
		if (uniqueID) {
			localStorage.setItem('pageNumber' + uniqueID, page);	
		}
		this.setState({pageNumber: page});
	}
	
	fetchFromUniqueId(uniqueId) {
		if (!uniqueId) return;
		if (uniqueId) {
			let pn = localStorage.getItem('pageNumber' + uniqueId);	
			pn = parseInt(pn, 10);
			if (isNaN(pn)) pn = 1;
			this.onActivePageChange(pn);
		}
		
		var url3 = FirebaseConstant.basePath + '/quiz/savedUserQuestions/'+uniqueId;
		var ref3 = firebaseDatabase.ref(url3);
		ref3.once('value', (snapshot) => {
			var result3 = snapshot.val();
			if (!result3) {
				alert('No Quiz Found.');
				localStorage.removeItem('uniqueID');
				return;
			}
			if (!result3.status || result3.status === 0) {
				alert('No Quiz Found.');
				localStorage.removeItem('uniqueID');
				return;
			}
			let result4 = result3.questionList;
			this.setState({finalQuestionList: result4, loading: false, uniqueID: uniqueId, seconds_assigned: (result4.length * 100)}, () => {
				this.checkResults(uniqueId, result4);																								   			});
			
		});		
	}
	
	checkResults(uniqueID, results=null) {
		if (this.state.uniqueID) {
			let urlOld = FirebaseConstant.basePath + '/quiz/savedUserQuestions/' + this.state.uniqueID;
			let refOld = firebaseDatabase.ref(urlOld);
			refOld.off();
		}
		let url = FirebaseConstant.basePath + '/quiz/savedUserQuestions/' + uniqueID;

		let ref = firebaseDatabase.ref(url);	
		ref.on('value', (snapshot) => {
			let res = snapshot.val();
			if (!res) return;
			if (!res.answers) return;
			this.setState({answers: res.answers});
			let uid = getUID();
			if (!res.answers[uid]) return;
			let answered = 0;
			let score = 0;
			let obj = {};
			//let pn = 0;
			if (res.answers[uid].myAnswers) {
				for (let key in res.answers[uid].myAnswers) {
					answered = answered + 1;
					if (res.answers[uid].myAnswers[key].isCorrect) {
						score = score + 1;	
					}
					obj[key] = parseInt(res.answers[uid].myAnswers[key].myOption, 10);
					//pn = pn + 1;
				}
				//this.onActivePageChange(pn);
			}
			
			let secs = null;
			if (results) {
				secs = results.length - answered;
				if (secs === 0) {
					secs = 1;	
				} else {
					secs = secs * 100;	
				}
				this.setState({seconds_assigned: secs});
			}
			this.setState({quizChoosenOption: obj, answered: answered, score: score});
			
		});	
	}

	componentDidMount() {
		let userObj = getUsersObj();
		if (!this.props.match.params.subject && !this.props.match.params.uniqueId) {
			/*var obj = localStorage.getItem('finalQuestionList');
			if (obj) {
				let pn = localStorage.getItem('pageNumber');
				if (!pn) pn = 1;
				pn = parseInt(pn, 10);
				let ans = localStorage.getItem('answered');
				if (!ans) ans = 0; else ans = parseInt(ans, 10);
				let sc = localStorage.getItem('score');
				if (!sc) sc = 0; else sc = parseInt(sc, 10);
				this.setState({finalQuestionList: JSON.parse(obj), loading: false, pageNumber: pn, answered: ans, score: sc});	
			}*/
			if (!(userObj.access_level === 'admin' || userObj.access_level === 'admin2' || userObj.access_level === 'superadmin')) {
				window.location.href = '/';
				return;
			}
			let uniqueId1 = localStorage.getItem('uniqueID');
			if (uniqueId1) {
				this.fetchFromUniqueId(uniqueId1);
			}
		}
		var url = FirebaseConstant.basePath + '/quiz/categories';

		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			var result = snapshot.val();

			var myArray = [];
			for (let key in result) {
				myArray.push(result[key]);
			}
			
			this.setState({categories: myArray});
		});
		
		if (this.props.match.params.uniqueId) {
			localStorage.setItem('uniqueID', this.props.match.params.uniqueId);
			this.fetchFromUniqueId(this.props.match.params.uniqueId);
			/*var url3 = FirebaseConstant.basePath + '/quiz/savedUserQuestions/'+this.props.match.params.uniqueId;
			var ref3 = firebaseDatabase.ref(url3);
			ref3.once('value', (snapshot) => {
				var result3 = snapshot.val();
				let result4 = result3.questionList;
				this.setState({finalQuestionList: result4, current:result4.current, qUid: result4.uid, loading: false, pageNumber: 1, answered: 0, score: 0, uniqueID: this.props.match.params.uniqueId, seconds_assigned: (result4.length * 100)});
			});*/
		}
		
		if (this.props.match.params.subject) {
			var url2 = FirebaseConstant.basePath + '/quiz/questions/' + this.props.match.params.subject;	
			var ref2 = firebaseDatabase.ref(url2);
			ref2.once('value', (snapshot) => {
				var result2 = snapshot.val();
				if (!result2) return;
				var arr = result2.filter((rec) => {
					return (this.props.match.params.id === rec.id);						  
				});
				
				this.setState({finalQuestionList: arr, loading: false, pageNumber: 1, answered: 0, score: 0});
			});
		}
		
		//activity tracker
		activityTracker('pageTracker', this.props.match.url);
	}
	
	createQuiz()
	{
		let uid = getUID();
		let questions = this.state.questions;
		if (!questions) return;
		let objQuestion = [];

		var orderby = parseInt(this.state.orderby, 10);
		
		if (orderby === 1) {
			//console.log('normal order');
			let startNum = 0;
			if (this.state.startNumber > 0) {
				startNum = this.state.startNumber - 1;	
			}
			objQuestion = questions.splice(startNum, this.state.number);
			//console.log('objQuestion is ', objQuestion);
		} else if (orderby === 2) {
			//console.log('random order');
			
			//find min and max question number for topic
			var maxCnt = questions.length;
			var num = 0;
			var tmpObj = {};
			var randomNumber = getRandomizer(0, (maxCnt - 1));
			//console.log('maxCnt: ', maxCnt);
			while (num < this.state.number) {
				var tmp = randomNumber();
				//console.log('num is ', num, ', tmp is ', tmp);
				if (!tmpObj[tmp]) {
					tmpObj[tmp] = 1;
					objQuestion.push(questions[tmp]);
					num++;
				}
			}
			
			//console.log('objQuestion2 is ', objQuestion);
		}
		
		//saving the question in db
		var url1 = FirebaseConstant.basePath + '/quiz/savedUserQuestions';
		var current = firebase.database.ServerValue.TIMESTAMP;
		let objX = {
			current: current,
			questionList: objQuestion,
			uid: uid,
			status: 1
		}
		var uniqueID = firebaseDatabase.ref(url1).push(objX).key;
		//end
		this.props.callChangeStartTime(0);
		localStorage.setItem('finalQuestionList', JSON.stringify(objQuestion));
		localStorage.setItem('uniqueID', uniqueID);
		this.setState({uniqueID: uniqueID, finalQuestionList: objQuestion, loading: false, seconds_assigned: (this.state.number * 100), answers: null});
		this.checkResults(uniqueID);
		window.location.href = "/quizPractice/" + uniqueID;
		
	}
	
	startQuiz(e) {
		e.preventDefault();
		if (!this.state.category || Object.keys(this.state.category).length === 0) {
			alert('please choose the category');
			return;
		}
		//console.log(this.state);
		this.setState({userAnswered: null, questions: null, quizChoosenOption: {}, score: 0, loading: true, answered: 0, pageNumber: 1});
		
		
		//console.log('cat is ', this.state.category.key);
		//get all questions from category choosen
		//var url = FirebaseConstant.basePath + '/quiz/questions/' + this.state.category.key;
		var url = FirebaseConstant.basePath + '/quiz/questions';
		//console.log('url is ', url);
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			var result = snapshot.val();
			let obj = [];
			for (let key in this.state.category) {
				obj = obj.concat(result[key]);
			}
			this.setState({questions: obj});
			this.createQuiz();
			/*
			let uid = getUID();
			let subject = '';
			let selectedCategory = (this.state.category) ? this.state.category.key : ((this.props.match.params.subject) ? this.props.match.params.subject : '');
			subject = '/' + selectedCategory;
			let uidPath = '/' + uid;
			//get all questions answered by the user
			var url2 = FirebaseConstant.basePath + '/quiz/simple_quiz' + uidPath + subject;
			//console.log('url2 is ', url2);
			var ref2 = firebaseDatabase.ref(url2);
			ref2.once('value', (snapshot) => {
				var result2 = snapshot.val();
				//console.log('result2 is ', result2);
				
				this.setState({userAnswered: result2}, () => {
					this.createQuiz();										
				});
				
				
			});*/

		});
		
		
	}
	
	handleChooseOption(e, isCorrect, details) {
		let obj = this.state.quizChoosenOption;
		let answered = this.state.answered;
		answered = answered + 1;
		let score = this.state.score;
		if (isCorrect) {
			score = score + 1;	
		}
		obj[details.id] = e;
		this.setState({quizChoosenOption: obj, score: score, answered: answered});
		localStorage.setItem('answered', answered);
		localStorage.setItem('score', score);
		
		let uid = getUID();
		if (!uid) {
			return;
		}
		let record = {};
		record.myOption = e;
		record.isCorrect = isCorrect;
		//let selectedCategory = (this.state.category) ? this.state.category.key : ((this.props.match.params.subject) ? this.props.match.params.subject : '');
		//let subject = '/' + selectedCategory;
		let issue = '/' + details.id;
		//let uidPath = '/' + uid;
		record.created_dt = firebase.database.ServerValue.TIMESTAMP;
		/*let url = FirebaseConstant.basePath + '/quiz/simple_quiz' + uidPath + subject + issue;
		firebaseDatabase.ref(url).push(record);*/
		
		//another location
		var url1 = FirebaseConstant.basePath + '/quiz/savedUserQuestions/' + this.state.uniqueID + '/answers/' + uid + '/myAnswers' + issue;
		var ref1 = firebaseDatabase.ref(url1);
		ref1.once('value', (snapshot) => {
			var result1 = snapshot.val();
			if (result1) {
				console.log('already answered this question: ', result1);
				return;
			}
			firebaseDatabase.ref(url1).set(record);
			let u = getUsersObj();
			var url2 = FirebaseConstant.basePath + '/quiz/savedUserQuestions/' + this.state.uniqueID + '/answers/' + uid + '/userInfo';
			firebaseDatabase.ref(url2).set({name: u.displayName, email: u.email, score: score, answered: answered});
		});
	}
	chooseCatOption(key, val, checked) {
		let opt = {...this.state.category};
		if (!checked && opt[val.key]) {
			delete opt[val.key];
		}
		if (checked) {
			opt[val.key] = val;
		}
		this.setState({category: opt});
	}

	render() {
		let userObj = getUsersObj();
		/*if (!(userObj.access_level === 'admin' || userObj.access_level === 'admin2' || userObj.access_level === 'superadmin')) {
			return <Redirect to="/" push={true} />
		}*/
		
		let myArrayConverted = null;
		let paginationProps = null;
		let rightSideBar = null;
		if (this.state.finalQuestionList) {
			let obj = processRecords(this.state.finalQuestionList, null, this.state.filterText, ['question', 'answers', 'explanation', 'topic'], 1, this.state.pageNumber, this.onActivePageChange.bind(this), 5);
			myArrayConverted = obj.myArrayConverted;
			paginationProps = obj.paginationProps;
			
			if (this.state.userAnswered && myArrayConverted[0] && myArrayConverted[0].id && this.state.userAnswered[myArrayConverted[0].id]) {
				//console.log('found one: ', 	myArrayConverted[0].id, ', ', this.state.userAnswered[myArrayConverted[0].id]);
				rightSideBar = [];
				
				for (let i in this.state.userAnswered[myArrayConverted[0].id]) {
					rightSideBar.push(this.state.userAnswered[myArrayConverted[0].id][i]);
				}
			}
		}
		
		//let selectedCategory = (this.state.category) ? this.state.category.key : ((this.props.match.params.subject) ? this.props.match.params.subject : '');
		/*const pn = parseInt(this.state.pageNumber, 10);
		let currentQuestion = null
		if (this.state.finalQuestionList) {
			currentQuestion = this.state.finalQuestionList[pn-1];
		}*/
		
		//console.log('this: ', this.state);
		return (
			
			<div className="row">
				<h1>Quiz Section</h1>
				<div className="col-md-8">
					{
						this.state.loading &&
						<Loader />
					}
					
					{
						myArrayConverted &&
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3 className="panel-title">Question {this.state.pageNumber} / {this.state.finalQuestionList.length}.</h3>
							</div>
							<div className="panel-body">
								{
									this.state.uniqueID && 
									<div>
										<strong>Unique URL:</strong> <a href={`/quizPractice/${this.state.uniqueID}`} target="_blank">{this.state.uniqueID}</a><br /><br />
									</div>
								}
								<div className="filterContainer"><input type="text" placeholder="Filter" className="form-control filterItem" onChange={(e) => {this.setState({filterText: e.target.value, pageNumber: 1});}} /><br /></div>
								{
									myArrayConverted.map((value, key) => {
										value = {
											...value,
											correct: parseInt(value.correct, 10)
										};
										let url = '/quizPractice/category_'+value.category_id+'/'+value.id;
										let optionChoosen = parseInt(this.state.quizChoosenOption[value.id], 10);
										let subjectCat = category[value.category_id];
										return <div key={key} className="questions">
											
												<div className="question">
												<div><a href={url} target="_blank">External Link</a><br /><br />
													</div>
												<div>Topic: <strong>{value.topic} / {subjectCat}</strong></div>
												<b>Q. {value.id}.</b> {renderHTML(value.question)}<hr /></div>
												<SimpleQuizAnsOptions id={value.id} opts={JSON.parse(value.answers)} optionChoosen={optionChoosen} handleChooseOption={this.handleChooseOption.bind(this)} details={value} />
											{/*<Help />*/}
											
											
											
										</div>
									})
								}
								<hr />
								<Paginator {...paginationProps} />
									
									
									
									
							</div>
						</div>
					}
					
					
				</div>
				<div className="col-md-4">
					{this.state.finalQuestionList &&
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3 className="panel-title">Score</h3>
							</div>
							<div className="panel-body">
								{
									this.state.seconds_assigned && 
									<Clock2 startTime={this.state.seconds_assigned} />
								}
								Your total score is <b>{this.state.score * 20} / {this.state.finalQuestionList.length * 20}</b><br />
								You answered <b>{this.state.answered} ({this.state.score} correct answers, {this.state.answered > 0 ? Math.floor((this.state.score / this.state.answered) * 100) : ''} %) / {this.state.finalQuestionList.length}</b> questions
									
									
							</div>
						</div>
					}
					
					{
						(this.state.finalQuestionList && this.state.answers) &&
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3 className="panel-title">Current Results</h3>
							</div>
							<div className="panel-body">
								{
									Object.keys(this.state.answers).map((value, key) => {
										let result = this.state.answers[value];
										if (!result.userInfo) return null;
										let score = parseInt(result.userInfo.score, 10);
										let answered = parseInt(result.userInfo.answered, 10);
										return <div key={value}>
											<h3>{result.userInfo.name}</h3>
											<div>Total score is <b>{score * 20} / {this.state.finalQuestionList.length * 20}</b><br />Answered <b>{answered} ({score} correct answers, {answered > 0 ? Math.floor((score / answered) * 100) : ''} %) / {this.state.finalQuestionList.length}</b> questions</div>
										</div>
									})	
								}
							</div>
						</div>
					}
					
					{
						rightSideBar && 
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3 className="panel-title">Past Results</h3>
							</div>
							<div className="panel-body">
								{
									rightSideBar.map((value, key) => {
										let tm = timeAgo(value.created_dt);
										let cStr = value.isCorrect ? 'correctly' : 'incorrectly';
										return <div key={key}>
											<b>{tm}</b>, You answered this question <b>{cStr}</b>
										</div>
									})
								}
									
									
							</div>
						</div>
					}
					
						
					
					{
						(userObj.access_level === 'admin' || userObj.access_level === 'admin2' || userObj.access_level === 'superadmin') &&
						
						<form onSubmit={this.startQuiz.bind(this)}>
						{
							this.state.categories && 
							<ul className="list-group">
							{
								this.state.categories.map((value, key) => {
									return <li key={key} className="list-group-item"><input type="checkbox" name="category" value={JSON.stringify(value)} onClick={(e) => { this.chooseCatOption(key, value, e.target.checked); }} /> {value.name} / {value.cnt}</li>				
								})
							}
							</ul>
						}
						<div className="form-group">
							<label>How many questions</label>
							<input type="number" className="form-control" placeholder="Enter Number of Questions" value={this.state.number} onChange={(e) => { this.setState({number: parseInt(e.target.value, 10)});}} />
						</div>
						<div className="form-group">
							<label>Order</label>
							<select className="form-control" defaultValue={this.state.orderby} onChange={(e) => {this.setState({orderby: e.target.value});}}>
								<option value="1">Normal</option>
								<option value="2">Random</option>
							</select>
							{
								this.state.orderby === "1" && 
								<div className="form-group">
									<label>Starting From</label>
									<input type="number" className="form-control" placeholder="Enter Starting Number" value={this.state.startNumber} onChange={(e) => { this.setState({startNumber: parseInt(e.target.value, 10)});}} />
								</div>
							}
						</div>
						
						{/*<div className="form-group">
							<label>Repetition</label><br /><br />
							<input type="radio" name="repeat" value="1" defaultChecked={true} onClick={(e) => { this.setState({repeat: e.target.value});}} /> Show All Questions <br /><br />
							<input type="radio" disabled={true} name="repeat" value="2" onClick={(e) => { this.setState({repeat: e.target.value});}} /> Show Unanswered Questions<br /><br />
							<input type="radio" disabled={true} name="repeat" value="3" onClick={(e) => { this.setState({repeat: e.target.value});}} /> Show Answered Questions
						</div>*/}
						 <br />
						<button type="submit" className="btn btn-primary form-control">Create Quiz</button>
					</form>
						
						
						
					}
					
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
		callChangeStartTime: (val) => {
			dispatch(changeStartTime(val));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPractice);