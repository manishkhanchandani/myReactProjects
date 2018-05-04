import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getUID, getUsersObj} from '../auth/AuthAction.js';
import {Redirect} from 'react-router-dom';
import {getRandomizer, processRecords, timeAgo} from '../../utilities/functions.js';

import Paginator from '../../utilities/Paginator.js';
import renderHTML from 'react-render-html';
import SimpleQuizAnsOptions from '../simple-quiz/SimpleQuizAnsOptions.js';
import '../simple-quiz/SimpleQuiz.css';
import Loader from '../Loader/Loader.js';
import Clock2 from '../clock1/Clock2.js';

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

class QuizPractice extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			categories: null,
			category: null,
			number: 100,
			orderby: 1,
			repeat: 2,
			questions: null,
			userAnswered: null,
			finalQuestionList: null,
			pageNumber: 1,
			quizChoosenOption: {},
			score: 0,
			answered: 0,
			loading: false,
			filterTerm: '',
			seconds_assigned: 0
			
		};
	}
	
	onActivePageChange(page) {
		localStorage.setItem('pageNumber', page);
		this.setState({pageNumber: page});
	}
	
	componentDidMount() {
		if (!this.props.match.params.subject) {
			var obj = localStorage.getItem('finalQuestionList');
			if (obj) {
				let pn = localStorage.getItem('pageNumber');
				if (!pn) pn = 1;
				pn = parseInt(pn, 10);
				let ans = localStorage.getItem('answered');
				if (!ans) ans = 0; else ans = parseInt(ans, 10);
				let sc = localStorage.getItem('score');
				if (!sc) sc = 0; else sc = parseInt(sc, 10);
				this.setState({finalQuestionList: JSON.parse(obj), loading: false, pageNumber: pn, answered: ans, score: sc});	
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
		
		if (this.props.match.params.subject) {
			var url2 = FirebaseConstant.basePath + '/quiz/questions/' + this.props.match.params.subject;	
			var ref2 = firebaseDatabase.ref(url2);
			ref2.once('value', (snapshot) => {
				var result2 = snapshot.val();
				if (!result2) return;
				var arr = result2.filter((rec) => {
					return (this.props.match.params.id === rec.id);						  
				});
				
				this.setState({finalQuestionList: arr, loading: false});
			});
		}
	}
	
	createQuiz()
	{
		let questions = this.state.questions;
		if (!questions) return;
		let objQuestion = [];

		var orderby = parseInt(this.state.orderby, 10);
		
		if (orderby === 1) {
			//console.log('normal order');
			objQuestion = questions.splice(0, this.state.number);
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
		localStorage.setItem('finalQuestionList', JSON.stringify(objQuestion));
		this.setState({finalQuestionList: objQuestion, loading: false, seconds_assigned: (this.state.number * 100)});
	
		
	}
	
	startQuiz(e) {
		e.preventDefault();
		if (!this.state.category) {
			alert('please choose the category');
			return;
		}
		//console.log(this.state);
		this.setState({userAnswered: null, questions: null, quizChoosenOption: {}, score: 0, loading: true, answered: 0, pageNumber: 1});
		
		
		//console.log('cat is ', this.state.category.key);
		//get all questions from category choosen
		var url = FirebaseConstant.basePath + '/quiz/questions/' + this.state.category.key;
		//console.log('url is ', url);
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			var result = snapshot.val();
			//console.log('result is ', result);
			
			this.setState({questions: result});
			
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
				
				
			});

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
		obj[this.state.pageNumber] = e;
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
		let selectedCategory = (this.state.category) ? this.state.category.key : ((this.props.match.params.subject) ? this.props.match.params.subject : '');
		let subject = '/' + selectedCategory;
		let issue = '/' + details.id;
		let uidPath = '/' + uid;
		record.created_dt = firebase.database.ServerValue.TIMESTAMP;
		let url = FirebaseConstant.basePath + '/quiz/simple_quiz' + uidPath + subject + issue;
		firebaseDatabase.ref(url).push(record);
	}

	render() {
		let userObj = getUsersObj();
		if (!(userObj.access_level === 'admin' || userObj.access_level === 'admin2' || userObj.access_level === 'superadmin')) {
			return <Redirect to="/" push={true} />
		}
		
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
		
		let selectedCategory = (this.state.category) ? this.state.category.key : ((this.props.match.params.subject) ? this.props.match.params.subject : '');
		console.log('this.state: ', this.state);
			
		return (
			
			<div className="row">
				<h1>Quiz Section</h1>
				<div className="col-md-3">
					
					<form onSubmit={this.startQuiz.bind(this)}>
					{
						this.state.categories && 
						<ul className="list-group">
						{
							this.state.categories.map((value, key) => {
								return <li key={key} className="list-group-item"><input type="radio" name="category" value={JSON.stringify(value)} onClick={(e) => { this.setState({category: JSON.parse(e.target.value)});}} /> {value.name} / {value.cnt}</li>				
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
					</div>
					
					<div className="form-group">
						<label>Repetition</label><br /><br />
						<input type="radio" name="repeat" value="1" defaultChecked={true} onClick={(e) => { this.setState({repeat: e.target.value});}} /> Show All Questions <br /><br />
						<input type="radio" disabled={true} name="repeat" value="2" onClick={(e) => { this.setState({repeat: e.target.value});}} /> Show Unanswered Questions<br /><br />
						<input type="radio" disabled={true} name="repeat" value="3" onClick={(e) => { this.setState({repeat: e.target.value});}} /> Show Answered Questions
					</div>
					 <br />
					<button type="submit" className="btn btn-primary form-control">Create Quiz</button>
				</form>
					
					
					
					
					
				</div>
				<div className="col-md-5">
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
								<div className="filterContainer"><input type="text" placeholder="Filter" className="form-control filterItem" onChange={(e) => {this.setState({filterText: e.target.value, pageNumber: 1});}} /><br /></div>
								{
									myArrayConverted.map((value, key) => {
										value = {
											...value,
											correct: parseInt(value.correct, 10)
										};
										//console.log('val is ', value);
										let url = '/quizPractice/'+selectedCategory+'/'+value.id;
										let optionChoosen = parseInt(this.state.quizChoosenOption[this.state.pageNumber], 10);
										return <div key={key} className="questions">
											
												<div className="question">
												{
												selectedCategory && 
													<span><a href={url} target="_blank">External Link</a><br /><br />
													</span>
												}
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
								Your total score is <b>{this.state.score * 20} / {this.state.finalQuestionList.length * 20}</b><br />
								You answered <b>{this.state.answered} ({this.state.score} correct answers, {this.state.answered > 0 ? Math.floor((this.state.score / this.state.answered) * 100) : ''} %) / {this.state.finalQuestionList.length}</b> questions
									
									
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
					
					
					
				</div>
			</div>
		);
	}
}

export default QuizPractice;