import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

const uid = '123Abc';

const quizData = {
	math: [
		{
			id: 1,
			question: 'What is 2 + 2 equal to? 1',
			answerOptions: [
				'4',
				'8',
				'5',
				'3'
			],
			correct: 0
		},
		{
			id: 2,
			question: 'What is 2 + 2 equal to? 2',
			answerOptions: [
				'4',
				'8',
				'5',
				'3'
			],
			correct: 0
		},
		{
			id: 3,
			question: 'What is 2 + 2 equal to? 3',
			answerOptions: [
				'4',
				'8',
				'5',
				'3'
			],
			correct: 0
		},
		{
			id: 4,
			question: 'What is 2 + 2 equal to? 4',
			answerOptions: [
				'4',
				'8',
				'5',
				'3'
			],
			correct: 0
		},
		{
			id: 5,
			question: 'What is 2 + 2 equal to? 5',
			answerOptions: [
				'4',
				'8',
				'5',
				'3'
			],
			correct: 0
		}
	],
	food: [
		{
			id: 1,
			question: 'Which is sweet food? 1',
			answerOptions: [
				'Food Sour A',
				'Food Salty B',
				'Food Sweet C',
				'Food Pungent D'
			],
			correct: 2
		},
		{
			id: 2,
			question: 'Which is spicy food? 2',
			answerOptions: [
				'Food Sour A',
				'Food Salty B',
				'Food Sweet C',
				'Food Spicy D'
			],
			correct: 3
		},
		{
			id: 3,
			question: 'Which is Pungent food?? 3',
			answerOptions: [
				'Food Sour A',
				'Food Salty B',
				'Food Sweet C',
				'Food Pungent D'
			],
			correct: 3
		},
		{
			id: 4,
			question: 'Which is sweet Sour?? 4',
			answerOptions: [
				'Food Sour A',
				'Food Salty B',
				'Food Sweet C',
				'Food Pungent D'
			],
			correct: 0
		},
		{
			id: 5,
			question: 'Which is salty food?? 5',
			answerOptions: [
				'Food Sour A',
				'Food Salty B',
				'Food Sweet C',
				'Food Pungent D'
			],
			correct: 1
		}
	]
};

class SimpleQuiz extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 0,
			points: 0,
			choosenOption: null,
			isCorrect: null
		}
	}
	
	submitBtn(data) {
		console.log('state is ', this.state);	
		
		let choosenOption = parseInt(this.state.choosenOption, 10);
		let pts = 0;
		let isCorrect = 'Incorrect Answer, Correct Option is Number ' + (data[this.state.pageNumber].correct + 1) + ', i.e. ' + data[this.state.pageNumber].answerOptions[data[this.state.pageNumber].correct];
		
		if (choosenOption === data[this.state.pageNumber].correct) {
			pts = 20;
			isCorrect = 'Correct Answer';
		}
		
		let totalPoints = this.state.points;
		totalPoints = totalPoints + pts;
		this.setState({points: totalPoints, isCorrect: isCorrect});
		
		
	}

	render() {
		const category = 'food';
		const data = quizData[category];
		const totalNumber = data.length;
		console.log('data is ', data);
		console.log('state is ', this.state);
		return (
			<div className="container">
				<h1>Simple Quiz based on {category}</h1>
				
				<div className="questions">
					<h3>Question {this.state.pageNumber + 1}. {data[this.state.pageNumber].question}?</h3>
					
					<div>
						{
							data[this.state.pageNumber].answerOptions.map((value, key) => {
								return 	<div key={key}><input type="radio" name="ansOptions" value={key} onClick={(e) => {this.setState({choosenOption: e.target.value})}} /> {value}</div>										   
							})	
						}
					</div>
					
					<div>
						<br />
						<Button bsStyle="primary" onClick={this.submitBtn.bind(this, data)}>Submit</Button>
						
						<div>
							{
								this.state.isCorrect && 
								
								<div>
									<div>
										{this.state.isCorrect}
									</div>
									<div>
										<Button bsStyle="primary" >Next Questions</Button>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
				
				<div className="results">
				
				</div>
			</div>
		);
	}
}

export default SimpleQuiz;