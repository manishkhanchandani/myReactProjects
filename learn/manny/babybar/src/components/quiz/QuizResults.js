import React, {Component} from 'react';

class QuizResults extends Component {
	render() {
		const pageData = this.props.data;
		const uid = this.props.uid;
		const questions = this.props.questions;
		if (!questions) return null;
		return (
			<div className="results">
				<h1>Results Page</h1>
				<div className="row">
					<div className="col-md-12">
						<DisplayChallengers data={pageData} uid={uid} />
					</div>
				</div>
				
				<div className="row">
					<div className="col-md-12">
						{
							pageData.questions.map((value, key) => {
								return <DisplayQuestionResults key={key} data={pageData} uid={uid} questions={questions} counter={key} question_id={value} />					
							})
						}
					
					</div>
				</div>
			</div>
		);
	}
}

class DisplayWinners extends Component {
	render() {
		
		const pageData = this.props.data;
		const user1 = this.props.user1;
		const user2 = this.props.user2;
		return (
			<div>
				{
					pageData[user1].points > pageData[user2].points && 
					<div>Winner</div>	
				}
				{
					pageData[user1].points < pageData[user2].points && 
					<div>Loser</div>	
				}
				{
					pageData[user1].points === pageData[user2].points && 
					<div>Draw</div>	
				}
			</div>
		);		
	}
}

class DisplayChallengers extends Component {
	render() {
		const pageData = this.props.data;
		const uid = this.props.uid;
		return (
			<div className="panel panel-primary">
			  <div className="panel-heading text-center">
				<h3 className="panel-title">Challangers {pageData.user1_creator} v/s {pageData.user2_creator}</h3>
			  </div>
			  <div className="panel-body">
				
				
				<div className="row">
					<div className="col-md-5 text-center">
						<div className="panel panel-default">
						  <div className="panel-heading">
							<h3 className="panel-title">{pageData.user1_creator}</h3>
						  </div>
						  <div className="panel-body">
							<img alt={pageData.user1_creator} className="img-responsive" src={pageData.user1_photoURL} />
						  </div>
						</div>
						
					</div>
					<div className="col-md-2 text-center">
						V / S
						
					</div>
					<div className="col-md-5 text-center">
						<div className="panel panel-default">
						  <div className="panel-heading">
							<h3 className="panel-title">{pageData.user2_creator}</h3>
						  </div>
						  <div className="panel-body">
							<img alt={pageData.user2_creator} className="img-responsive" src={pageData.user2_photoURL} />
							
						  </div>
						</div>
						
					</div>
				</div>
				
				<div className="row">
					<div className="col-md-5 text-center">
						<div>Total Points: <b>{pageData[pageData.user1_uid].points}</b></div>
						<DisplayWinners data={pageData} uid={uid} user1={pageData.user1_uid} user2={pageData.user2_uid} />
						
					</div>
					<div className="col-md-2 text-center">
						
					</div>
					<div className="col-md-5 text-center">
						<div>Total Points: <b>{pageData[pageData.user2_uid].points}</b></div>
						<DisplayWinners data={pageData} uid={uid} user1={pageData.user2_uid} user2={pageData.user1_uid} />
					</div>
				</div>
					
				
				
				
			  </div>
			  
			</div>	
		);
	}
}


class DisplayQuestionResults extends Component {
	render() {
		const pageData = this.props.data;
		console.log(pageData);
		return null;
		const questions = this.props.questions;
		const counter = this.props.counter;
		const question_id = this.props.question_id;
		const ansOptions = JSON.parse(questions[question_id].answers);
		const correct = parseInt(questions[question_id].correct, 10);
		return (
			<div>
				<div className="panel panel-default">
				  <div className="panel-heading">
					<h3 className="panel-title question"><b>Question {counter + 1}:</b> {questions[question_id].question}</h3>
				  </div>
				  <div className="panel-body">
				  	
					<div className="row">
						<div className="col-md-5">
							<div className="row">
								<div className="col-md-6">
									<h3>{pageData.user1_creator}</h3>
								</div>
								<div className="col-md-6">
									<img alt={pageData.user1_creator} className="img-responsive sm" src={pageData.user1_photoURL} />
								</div>
							</div>
							<div className="meta">
								<div><b>Correct Answer: </b> {correct + 1}</div>
								<div><b>Answered: </b> {pageData.quizDetails.quiz[counter][pageData.user1_uid].isCorrect ? <span>Correct</span> : <span>Wrong</span>}</div>
								<div><b>Points: </b> {pageData.quizDetails.quiz[counter][pageData.user1_uid].points}</div>
							</div>
							<div className="frb-group">
							{
								ansOptions.map((value, key) => {
									var myClass = 'primary';
									if (key === correct) {
										myClass = 'success';	
									}
									let yourAnswer = parseInt(pageData.quizDetails.quiz[counter][pageData.user1_uid].answer, 10);
									return <div key={key} className={`frb frb-${myClass}`}>
										<input type="radio" id={`option_${key}`} name={`user_1_answer_${counter}`} value={key} disabled="disabled" checked={key === yourAnswer} />
										<label htmlFor={`option_${key}`}>
											<span className="frb-title">{value}</span>
										</label>
									</div>
								})	
							}
							</div>
							<div>
								{/*more*/}
							</div>
							
						</div>
						<div className="col-md-2 text-center">
							
						</div>
						<div className="col-md-5">
							<div className="row">
								<div className="col-md-6">
									<h3>{pageData.user2_creator}</h3>
								</div>
								<div className="col-md-6">
									<img alt={pageData.user2_creator} className="img-responsive sm" src={pageData.user2_photoURL} />
								</div>
							</div>
							<div className="meta">
								<div><b>Correct Answer: </b> {correct + 1}</div>
								<div><b>Answered: </b> {pageData.quizDetails.quiz[counter][pageData.user2_uid].isCorrect ? <span>Correct</span> : <span>Wrong</span>}</div>
								<div><b>Points: </b> {pageData.quizDetails.quiz[counter][pageData.user2_uid].points}</div>
							</div>
							<div className="frb-group">
							{
								ansOptions.map((value, key) => {
									var myClass = 'primary';
									if (key === correct) {
										myClass = 'success';	
									}
									let yourAnswer = parseInt(pageData.quizDetails.quiz[counter][pageData.user2_uid].answer, 10);
									return <div key={key} className={`frb frb-${myClass}`}>
										<input type="radio" id={`option_${key}`} name={`user_2_answer_${counter}`} value={key} disabled="disabled" checked={key === yourAnswer} />
										<label htmlFor={`option_${key}`}>
											<span className="frb-title">{value}</span>
										</label>
									</div>
								})	
							}
							</div>
						</div>
					</div>
				  </div>
				</div>
			</div>
		);		
	}
}


export default QuizResults;