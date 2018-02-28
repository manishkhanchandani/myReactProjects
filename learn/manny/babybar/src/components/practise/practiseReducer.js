const PractiseReducer = (state = {
	practice_question_result: null
}, action) => {
	switch (action.type) {
		case 'PRACTISE_QUESTION_RESULT':
			state = {
				...state,
				practice_question_result: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default PractiseReducer;