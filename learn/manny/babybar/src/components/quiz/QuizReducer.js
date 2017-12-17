const QuizReducer = (state = {
	created_id: null,
	data: null,
	data_error: null,
	
	started_data: null,
	started_data_error: null,
	
	completed_data: null,
	completed_data_error: null,
	
	showModal: false,
	currentRecord: null,
	
	selectedQuiz: {},
	questions: null
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
		case 'CLOSE':
			state = {
				...state,
				showModal: action.showModal,
				currentRecord: action.currentRecord
			}
			break;
		case 'OPEN':
			state = {
				...state,
				showModal: action.showModal,
				currentRecord: action.currentRecord
			}
			break;
		case 'SELECTED_QUIZ_RESULT':
			var tmpObject = state.selectedQuiz;
			tmpObject[action.key] = action.payload;
			state = {
				...state,
				selectedQuiz: tmpObject
			}
			break;
		case 'STARTED_QUIZ_RESULT':
			state = {
				...state,
				started_data: action.payload,
				started_data_error: action.error
			}
			break;
		case 'COMPLETED_QUIZ_RESULT':
			state = {
				...state,
				completed_data: action.payload,
				completed_data_error: action.error
			}
			break;
		case 'QUESTIONS_FULFILLED':
			state = {
				...state,
				questions: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default QuizReducer;