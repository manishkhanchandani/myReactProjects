import React, {Component} from 'react';

import {timeAgo} from '../../utilities/functions.js';
import SimpleQuizAnsOptions from './SimpleQuizAnsOptions.js';
import {Button} from 'react-bootstrap';

class SimpleQuizResults extends Component {
	render() {
		if (!this.props.quizDetails) {
			return null;	
		}
		return (
			<div className="results">
				
					{this.props.pastResults ? 
						<h3>{timeAgo(this.props.quizDetails.created_dt)}</h3>
						:
						<h3>Results</h3>
					}
				
				
				<div className="row">
					<div className="col-md-12">
						<b>Total:</b> {this.props.quizDetails.total} / ({this.props.quizDetails.details.length * 20})
					</div>
				</div>
				
				<br />
				<div className="row">
					<div className="col-md-12">
				
					{
						this.props.quizDetails.details.map((value, key) => {
							return <div key={key} className="panel panel-primary">
							  <div className="panel-heading"><b>Question {key + 1}.</b> {value.question}</div>
							  <div className="panel-body">
								<SimpleQuizAnsOptions id={value.id} opts={value.answerOptions} optionChoosen={value.choosenOption} correct={value.correct} viewOnly={true} />
							  </div>
							</div>					
						})
					}
					</div>
				</div>
				
				{
					this.props.quiz_start &&
					<Button bsStyle="primary" className="form-control" onClick={this.props.quiz_start.bind(this, false)}>Close Quiz</Button>
					
				}
				
			</div>
		);
	}
}

export default SimpleQuizResults;