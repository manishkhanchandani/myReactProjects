import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as quizActions from './QuizAction.js';
import {getUID} from '../auth/AuthAction.js';
import QuizPage1 from './QuizPage1.js';
import QuizPage2 from './QuizPage2.js';
import QuizResults from './QuizResults.js';

class QuizWelcomeScreen extends Component {
	
	componentWillReceiveProps(nextProps) {
		if (!nextProps.quizReducer.questions && nextProps.quizReducer.selectedQuiz[nextProps.match.params.id]) {
			var details = nextProps.quizReducer.selectedQuiz[nextProps.match.params.id];
			nextProps.callGetQuestions(details.topicKey);
		}
	}
	
	componentDidMount() {
		this.props.callSelectedQuiz(this.props.match.params.id);
	}

	render() {
		const pageData = this.props.quizReducer.selectedQuiz[this.props.match.params.id];
		if (!pageData) {
			return null;
		}
		
		const uid = getUID();
		return (
			<div className="welcome container">
					
					
					{
						(pageData.user1_status === 'Pending' || pageData.user2_status === 'Pending') &&
						<QuizPage1 data={pageData} uid={uid} />
					}
					
					{
						(pageData.user1_status === 'Ready' && pageData.user2_status === 'Ready' && pageData.quizDetails.common.question_pointer < 5) &&
						<QuizPage2 data={pageData} uid={uid} />
					}
					
					{
						(pageData.quizDetails.common.question_pointer > 4) && 
						<QuizResults data={pageData} uid={uid} questions={this.props.quizReducer.questions} />
					}
					
					
					
					
				
				
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
		callSelectedQuiz: (id) => {
			quizActions.selectedQuiz(id, dispatch);
		},
		callGetQuestions: (catId) => {
			dispatch(quizActions.getQuestions(catId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizWelcomeScreen);