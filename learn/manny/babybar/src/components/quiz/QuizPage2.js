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
			btnDisabled: false,
			timeRemaining: 0
		}
	}
	
	
	/*watchQuestion()
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
	}*/
	
	changeSeconds(secs) {
		return;
		let total = secs.total;
		let newTotal = total / 1000;
		this.setState({timeRemaining: newTotal});
	}
	
	componentDidMount() {
		//this.watchQuestion();
	}
	
	submittedBtn(questionData) {
		if (!this.state.optionChoosen) {
			return;	
		}
		this.setState({btnDisabled: true});
		
		var points = 0;
		var newPoints = 0;
		const option1 = parseInt(this.state.optionChoosen, 10);
		const option2 = parseInt(questionData.correct, 10);
		if (option1 === option2) {
			points = 20;
			newPoints = 9 + Math.floor(this.state.timeRemaining / 10);
		}
		
		console.log('newPoints: ', newPoints);
		
		var totalPoints = this.props.data[this.props.uid].points + points;
		var obj = {
			answer: option1,
			timeTaken: 0,
			points,
			totalPoints,
			isCorrect: option1 === option2,
			//,timeRemaining: this.state.timeRemaining,
			newPoints: newPoints
		};
		
		var url = FirebaseConstant.basePath + '/quiz/posts/' + this.props.data.id;
		firebaseDatabase.ref(url).child('quizDetails').child('quiz').child(this.props.data.quizDetails.common.question_pointer).child(this.props.uid).update(obj);
		
		let question_pointer = this.props.data[this.props.uid].question_pointer + 1;
		
		firebaseDatabase.ref(url).child(this.props.uid).update({points: totalPoints, question_pointer: question_pointer});
		if (question_pointer > 4) {
			firebaseDatabase.ref(url).child(this.props.uid).child('status').set('Completed');
		}
	}
	
	
	render() {
		const pageData = this.props.data;		
		const questionData = this.props.quizReducer.questions ? this.props.quizReducer.questions[pageData.questions[pageData[this.props.uid].question_pointer]] : null;

		if (!questionData) {
			return <Loader />	
		}
				
		let isUserParticipant = false;
		if (pageData[this.props.uid]) {
			isUserParticipant = true;
		}

		let seconds_assigned = 600;
				
		const ansOptions = JSON.parse(questionData.answers);
		const optionChoosen = parseInt(this.state.optionChoosen, 10);
		
		console.log('state is ', this.state);
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
														<input type="radio" id={`option_${key}`} name="answers" value={key}  onClick={(e) => {this.setState({optionChoosen: e.target.value});}} checked={optionChoosen === key} disabled={!isUserParticipant} />
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
								
								{
									isUserParticipant && 
									<div>
										{
											this.state.btnDisabled &&
											<div>Waiting for Opponent....</div>
										}
										<Button disabled={this.state.btnDisabled} bsStyle="primary" onClick={this.submittedBtn.bind(this, questionData)} className="form-control">Submit</Button>
									</div>
								}
								<br /><br /><br />
								
						</div>
						<div className="col-md-3 text-center">
							<Clock1 startTime={seconds_assigned} changeSeconds={this.changeSeconds.bind(this)} id={pageData.quizDetails.common.question_pointer} />
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