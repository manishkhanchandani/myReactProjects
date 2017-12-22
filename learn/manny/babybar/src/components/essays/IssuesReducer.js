const IssuesReducer = (state = {
	subjects: null,
	subject: null,
	//issues: null,
	issue: null,
	issue_answers: null,
	baby_bar_exam: null
}, action) => {
	switch (action.type) {
		case 'GET_BABYBAREXAM_JSON_FULFILLED':
			state = {
				...state,
				baby_bar_exam: action.payload
			}
			break;
		case 'GET_SUBJECTS_JSON_FULFILLED':
			state = {
				...state,
				subjects: action.payload,
				//issues: null,
				issue: null
			}
			break;
		case 'GET_SUBJECT_JSON':
			state = {
				...state,
				subject: action.payload,
				//issues: null,
				issue: null
			}
			break;
		case 'GET_ISSUE_JSON_FULFILLED':
			state = {
				...state,
				issue: action.payload
			}
			break;
		case 'GET_SUBJECTS':
			state = {
				...state,
				//subjects: action.payload,
				//issues: null,
				//issue: null
			}
			break;
		case 'GET_SUBJECT':
			state = {
				...state,
				//subject: action.payload,
				//issues: null,
				//issue: null
			}
			break;
		case 'GET_ISSUES':
			state = {
				...state,
				//issues: action.payload
			}
			break;
		case 'GET_ISSUE':
			state = {
				...state,
				//issue: action.payload
			}
			break;
		case 'ISSUE_ANSWERS_FULFILLED':
			state = {
				...state,
				issue_answers: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default IssuesReducer;