import React, {Component} from 'react';
import {connect} from 'react-redux';

import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import * as quizActions from './QuizAction.js';
import {getUID} from '../auth/AuthAction.js';
import QuizPage1 from './QuizPage1.js';
import QuizPage2 from './QuizPage2.js';
import QuizResults from './QuizResults.js';

class QuizWelcomeScreen extends Component {
	
	
	watchQuestion()
	{
		var url = FirebaseConstant.basePath + '/quiz/posts/'+this.props.match.params.id;
		console.log('url is ', url);
		var ref = firebaseDatabase.ref(url);

		ref.off();
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result) return false;
			console.log('results is ', result);
			
			let data1 = result[result.user1_uid];
			let data2 = result[result.user2_uid];
			if (data1.status === 'Completed' && data2.status === 'Completed' && result.status !== 'Completed') {
				ref.child('status').set('Completed');
			}
			
		});
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.quizReducer.questions && nextProps.quizReducer.selectedQuiz[nextProps.match.params.id]) {
			var details = nextProps.quizReducer.selectedQuiz[nextProps.match.params.id];
			nextProps.callGetQuestions(details.topicKey);
		}
	}
	
	componentDidMount() {
		this.props.callSelectedQuiz(this.props.match.params.id);
		this.watchQuestion();
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
						(pageData.user1_status === 'Ready' && pageData.user2_status === 'Ready' && pageData[uid].question_pointer < 5) &&
						<QuizPage2 data={pageData} uid={uid} />
					}
					
					{
						(pageData[uid].question_pointer > 4) && 
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