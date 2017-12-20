const SimpleQuizReducer = (state = {
	simple_quiz_answers: null
}, action) => {
	switch (action.type) {
		case 'SIMPLE_QUIZ_ANSWERS_FULFILLED':
		console.log('action is ', action);
			state = {
				...state,
				simple_quiz_answers: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default SimpleQuizReducer;