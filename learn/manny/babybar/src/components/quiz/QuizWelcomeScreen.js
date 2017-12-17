import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as quizActions from './QuizAction.js';
import {getUID} from '../auth/AuthAction.js';
import QuizPage1 from './QuizPage1.js';
import QuizPage2 from './QuizPage2.js';

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
		console.log('props are ', this.props);
		const pageData = this.props.quizReducer.selectedQuiz[this.props.match.params.id];
		console.log('pageData: ', pageData);
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
						(pageData.user1_status === 'Ready' && pageData.user2_status === 'Ready') &&
						<QuizPage2 data={pageData} uid={uid} />
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