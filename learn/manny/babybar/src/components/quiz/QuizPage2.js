import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import * as quizActions from './QuizAction.js';
import Clock1 from './Clock1.js';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import Loader from '../Loader/Loader.js';

class QuizPage2 extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			optionChoosen: '',
			btnDisabled: false
		}
	}
	
	
	watchQuestion()
	{
		var url = FirebaseConstant.basePath + '/quiz/posts/' + this.props.data.id;
		var ref = firebaseDatabase.ref(url).child('quizDetails').child('quiz');

		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result) return false;
			var questionCounter = parseInt(this.props.data.quizDetails.common.question_pointer, 10);
			var counter = null;
			
			if (result[questionCounter]) {
				counter = Object.keys(result[questionCounter]).length;
			}
			
			if (counter === 2) {
				this.setState({optionChoosen: '', btnDisabled: false});
				if (questionCounter === 4) {
					//create result
					firebaseDatabase.ref(url).child('status').set('Completed');
				}
				
				var newVal = questionCounter + 1;
				firebaseDatabase.ref(url).child('quizDetails').child('common').child('question_pointer').set(newVal);
			}
		});
	}
	
	
	componentDidMount() {
		this.watchQuestion();
	}
	
	submittedBtn(questionData) {
		this.setState({btnDisabled: true});
		
		var points = 0;
		const option1 = parseInt(this.state.optionChoosen, 10);
		const option2 = parseInt(questionData.correct, 10);
		if (option1 === option2) {
			points = 20;
		}
		
		var totalPoints = this.props.data[this.props.uid].points + points;
		var obj = {
			answer: option1,
			timeTaken: 0,
			points,
			totalPoints,
			isCorrect: option1 === option2
		};
		
		var url = FirebaseConstant.basePath + '/quiz/posts/' + this.props.data.id;
		firebaseDatabase.ref(url).child('quizDetails').child('quiz').child(this.props.data.quizDetails.common.question_pointer).child(this.props.uid).update(obj);
		
		firebaseDatabase.ref(url).child(this.props.uid).child('points').set(totalPoints);
	}
	
	
	render() {
		const pageData = this.props.data;
		
		const questionData = this.props.quizReducer.questions ? this.props.quizReducer.questions[pageData.questions[pageData.quizDetails.common.question_pointer]] : null;

		if (!questionData) {
			return <Loader />	
		}
		
		const ansOptions = JSON.parse(questionData.answers);
		const optionChoosen = parseInt(this.state.optionChoosen, 10);
		return (
			<div className="page2">
				<div className="panel panel-primary">
				  <div className="panel-heading text-center">
					<h3 className="panel-title">Challangers {pageData.user1_creator} v/s {pageData.user2_creator}</h3>
				  </div>
				  <div className="panel-body">
					
					
					<div className="row">
						<div className="col-md-9">
							<div className="panel panel-default">
							  <div className="panel-heading">
								<h3 className="panel-title">Question</h3>
							  </div>
							  <div className="panel-body">
								{
									questionData && 
									<div className="question">
										{questionData.question}
									</div>
								}
								
							  </div>
							</div>
							  
							  <div className="panel panel-default">
								  <div className="panel-heading">
									<h3 className="panel-title">Options</h3>
								  </div>
							  
									<div className="panel-body">
									{
										(questionData && ansOptions) && 
											<div className="frb-group">
											{
												ansOptions.map((value, key) => {
													return <div key={key} className="frb frb-primary">
														<input type="radio" id={`option_${key}`} name="answers" value={key}  onClick={(e) => {this.setState({optionChoosen: e.target.value});}} checked={optionChoosen === key} />
														<label htmlFor={`option_${key}`}>
															<span className="frb-title">{value}</span>
														</label>
													</div>
												})	
											}
											</div>
									}
									
								
										<input className="hidden" type="radio" id={`option_`} name="answers" value="" onChange={(e) => {this.setState({optionChoosen: e.target.value});}} checked={optionChoosen === ''} />
							  		</div>
								</div>
								
								<Button disabled={this.state.btnDisabled} bsStyle="primary" onClick={this.submittedBtn.bind(this, questionData)} className="form-control">Submit</Button>
								<br /><br /><br />
								
						</div>
						<div className="col-md-3 text-center">
							<Clock1 startTime={120} />
							<br />
							<div className="panel panel-default">
							  <div className="panel-heading">
								<h3 className="panel-title">{pageData.user1_creator}</h3>
							  </div>
							  <div className="panel-body">
								<img alt={pageData.user1_creator} className="img-responsive sm" src={pageData.user1_photoURL} />

							  </div>
							</div>
							<div>V / S</div>
							<br />
							<div className="panel panel-default">
							  <div className="panel-heading">
								<h3 className="panel-title">{pageData.user2_creator}</h3>
							  </div>
							  <div className="panel-body">
								<img alt={pageData.user2_creator} className="img-responsive sm" src={pageData.user2_photoURL} />
								
								
							  </div>
							</div>
							
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
		quizReducer: state.QuizReducer
	}
};


const mapDispatchToProps = (dispatch) => {
	return {
		callChangeUser1Status: (id, status) => {
			quizActions.changeUser1Status(id, status);	
		},
		callChangeUser2Status: (id, status) => {
			quizActions.changeUser2Status(id, status);	
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage2);