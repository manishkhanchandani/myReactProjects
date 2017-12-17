import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import * as quizActions from './QuizAction.js';
import Clock1 from './Clock1.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class QuizPage2 extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			questionData: null	
		}
	}
	
	getQuestionDetails(id, topickey) {
		var url = FirebaseConstant.basePath + '/quiz/posts/'+id + '/quizDetails/common';
		console.log(url);
		var ref = firebaseDatabase.ref(url);
		ref.off();
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result.question) {
				return null;	
			}
			var questionUrl = FirebaseConstant.basePath + '/quiz/questions/'+topickey+'/'+result.question;
			var questionRef = firebaseDatabase.ref(questionUrl);
			questionRef.once('value', (snapshot) => {
				var questionResult = snapshot.val();
				questionResult = {
					...questionResult,
					answers: JSON.parse(questionResult.answers)
				}
				this.setState({questionData: questionResult});
			});
		});
	}
	
	componentDidMount() {
		this.getQuestionDetails(this.props.data.id, this.props.data.topicKey);
	}
	
	
	render() {
		const pageData = this.props.data;
		const uid = this.props.uid;
		
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
									this.state.questionData && 
									<div className="question">
										{this.state.questionData.question}
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
										(this.state.questionData && this.state.questionData.answers) && 
										<div className="answers">
											{
												this.state.questionData.answers.map((value, key) => {
													return <li key={key}>
														<input type="radio" name="answers" value={key} onChange={(e) => {console.log(e.target.checked); console.log(e.target.value);}} /> {value}
													</li>
												
												})	
											}
										</div>
									}
								
							  		</div>
								</div>
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