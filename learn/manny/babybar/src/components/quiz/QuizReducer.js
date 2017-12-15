const QuizReducer = (state = {
	created_id: null,
	data: null,
	data_error: null
}, action) => {
	switch (action.type) {
		case 'CREATE_QUIZ_FULFILLED':
			state = {
				...state,
				created_id: action.payload
			}
			break;
		case 'LIST_QUIZ_RESULT':
			state = {
				...state,
				data: action.payload,
				data_error: action.error
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default QuizReducer;