import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getUID} from '../auth/AuthAction.js';

class UserQuizAdd extends Component {
	
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
		
		if (!this.state.question) {
			this.setState({error: 'Choose question'});
			return;
		}

		if (!this.state.correct) {
			this.setState({error: 'Choose correct option'});
			return;
		}
		
		let uid = getUID();
		var obj = {};
		obj.question = this.state.question;
		obj.answerOptions = this.state.answerOptions;
		obj.correct = this.state.correct;
		obj.explanation = this.state.explanation;
		obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
		var url = FirebaseConstant.basePath + '/userQuiz/' + uid + '/questions/' + this.state.category + '/'  + this.state.subcategory;
		firebaseDatabase.ref(url).push(obj);
		this.setState({question: '', answerOptions: ['', '', '', ''], explanation: ''});
		this.getQuiz();
	}
	
	render() {
		console.log('state is ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<h3>Add Quiz</h3>
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
								<br />
								<textarea className="form-control" placeholder="Enter Question" value={this.state.question} onChange={(e) => {
									this.setState({question: e.target.value});	
								}} />
								<br />
								<textarea type="text" className="form-control" placeholder="Enter Option 1"  value={this.state.answerOptions[0]} onChange={this.updateOption.bind(this, 0)} />
								<br />
								<textarea type="text" className="form-control" placeholder="Enter Option 2"  value={this.state.answerOptions[1]} onChange={this.updateOption.bind(this, 1)} />
								<br />
								<textarea type="text" className="form-control" placeholder="Enter Option 3"  value={this.state.answerOptions[2]} onChange={this.updateOption.bind(this, 2)} />
								<br />
								<textarea type="text" className="form-control" placeholder="Enter Option 4"  value={this.state.answerOptions[3]} onChange={this.updateOption.bind(this, 3)} />
								<br />
								<b>Correct Option: </b>
								<label className="radio-inline"><input type="radio" value="0" name="correct"  onClick={(e) => {this.setState({correct: e.target.value})}} />Option 1</label>
								<label className="radio-inline"><input type="radio" value="1" name="correct"  onClick={(e) => {this.setState({correct: e.target.value})}} />Option 2</label>
								<label className="radio-inline"><input type="radio" value="2" name="correct"  onClick={(e) => {this.setState({correct: e.target.value})}} />Option 3</label>
								<label className="radio-inline"><input type="radio" value="3" name="correct"  onClick={(e) => {this.setState({correct: e.target.value})}} />Option 4</label>
								<br />
								<br />
								<textarea className="form-control" placeholder="Enter Explanation" value={this.state.explanation} onChange={(e) => {
									this.setState({explanation: e.target.value});	
								}} />
								<br />
								<br />
								<button type="submit" className="btn btn-primary form-control">Add Quiz</button>
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

export default UserQuizAdd;