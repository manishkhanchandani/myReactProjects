import React, {Component} from 'react';

import {connect} from 'react-redux';
import './Quiz.css';
import * as quizActions from './QuizAction.js';
import QuizChooseTopic from './QuizChooseTopic.js';
import QuizLizt from './QuizList.js';
import QuizStartedList from './QuizStartedList.js';
import QuizCompletedList from './QuizCompletedList.js';


class Quiz extends Component {
	
	
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>California Baby Bar Quiz Challenges</h1>
						<p>Challenge quiz with friends and others</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3">
						<QuizChooseTopic />
					</div>
					<div className="col-md-9 challenges">
						<QuizStartedList />
						<QuizLizt />
						<QuizCompletedList />
						
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
		callListQuiz: () => {
			dispatch(quizActions.listQuiz(dispatch));	
		},
		callStartedQuiz: () => {
			quizActions.startedQuiz(dispatch);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);