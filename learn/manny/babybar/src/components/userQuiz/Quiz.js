import React, {Component} from 'react';
//import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getUID} from '../auth/AuthAction.js';

class UserQuiz extends Component {
	
	constructor(props) {
		super(props);	
		
		let category = this.props.match.params.category ? this.props.match.params.category : null;
		let subcategory = this.props.match.params.subcategory ? this.props.match.params.subcategory : null;
		
		this.state = {
			question: '',
			answerOptions: ['', '', '', ''],
			correct: '',
			explanation: '',
			categories: null,
			subcategories: null,
			category: category,
			subcategory: subcategory,
			quizResults: null
		};
	}
	
	componentDidMount() {
		this.getCategories();	
	}
	
	getQuiz() {
		if (!this.state.category) return;
		if (!this.state.subcategory) return;
		let uid = getUID();
		var url = FirebaseConstant.basePath + '/userQuiz/' + uid + '/questions/' + this.state.category + '/'  + this.state.subcategory;
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({quizResults: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				records[k]._id = k;
				myArray.push(records[k]);
			}

			this.setState({quizResults: myArray});
		});
	}
	
	getCategories() {
		let uid = getUID();
		let url = FirebaseConstant.basePath + '/userQuiz/' + uid + '/categories';
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({categories: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				records[k]._id = k;
				if (records[k].subcategories) {
					let subcat = [];
					for (let j in records[k].subcategories) {
						records[k].subcategories[j]._id = j;
						subcat.push(records[k].subcategories[j]);
					}
					records[k].subcat = subcat;
				}
				myArray.push(records[k]);
			}

			this.setState({categories: myArray});
		});
	}
	
	updateOption(opt, e) {
		let arr = this.state.answerOptions;
		arr[opt] = e.target.value;
		this.setState({answerOptions: arr});
	}
	
	chooseCategory(e) {
		if (!e.target.value) return;
		let obj = JSON.parse(e.target.value);
		if (obj.subcat) {
			this.setState({subcategories: obj.subcat, category: obj._id});
		} else {
			this.setState({subcategories: null, category: obj._id});
		}
	}
	
	
	chooseSubCategory(e) {
		if (!e.target.value) return;
		let obj = JSON.parse(e.target.value);
		console.log('obj is ', obj);
		this.setState({subcategory: obj._id}, () => {
			this.getQuiz();									   
		});
	}
	
	submitQuiz(e) {
		e.preventDefault();
		console.log('this. state is ', this.state);
		if (!this.state.category) {
			this.setState({error: 'Choose Category'});
			return;
		}
		if (!this.state.subcategory) {
			this.setState({error: 'Choose SubCategory'});
			return;
		}
		
	}
	
	render() {
		console.log('state is ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<h3>Choose Quiz Criteria</h3>
						<form onSubmit={this.submitQuiz.bind(this)}>
							<div className="form-group">
								<div className="form-group">
								  <label htmlFor="category">Category:</label>
								  <select className="form-control" id="category" onChange={this.chooseCategory.bind(this)}>
									<option value="">Select Category</option>
									{
										this.state.categories && this.state.categories.map((val, key) => {										
											return <option key={key} value={JSON.stringify(val)}>{val.category}</option>										
										})
									}
								  </select>
								</div>
								<div className="form-group">
								  <label htmlFor="subcategory">Sub Category:</label>
								  <select className="form-control" id="subcategory" onChange={this.chooseSubCategory.bind(this)}>
									<option value="">Select Subcategory</option>
									{
										this.state.subcategories && this.state.subcategories.map((val, key) => {
											return <option key={key} value={JSON.stringify(val)}>{val.subcategory}</option>										
										})
									}
								  </select>
								</div>
								<div className="form-group">
								  <label htmlFor="subcategory">Qyestion Type:</label>
								  <select className="form-control" id="subcategory">
									<option value="">Select Type</option>
									<option value="1">Order by Created Date</option>
									<option value="2">Random Order</option>
								  </select>
								</div>
								<div className="form-group">
								  <label htmlFor="subcategory">Max Questions (Type -1 for All Questions, Type -2 for All Unanswered Questions, Type -3 for All Answered Questions):</label>
									<input type="text" className="form-control" placeholder="Enter Number of Questions"  value={this.state.no_of_questions} />
								</div>
								<button type="submit" className="btn btn-primary form-control">Create Quiz</button>
							</div>
						</form>
						
					</div>
					
					<div className="col-md-6">
						<h3>Quiz Questions</h3>
						{
							this.state.quizResults &&
							<ul>
								{
									this.state.quizResults.map((value, key) => {
										return <li key={key}>{value.question}</li>							
									})	
								}
							</ul>
						}
					</div>
					
				</div>
				
				
				
				
			</div>
		);
	}
}

export default UserQuiz;