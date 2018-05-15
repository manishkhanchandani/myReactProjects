const IssuesReducer = (state = {
	subjects: null,
	subject: null,
	//issues: null,
	issue: {},
	issue_answers: null,
	baby_bar_exam: {},
	baby_bar_rules: {},
	startTime: 0
}, action) => {
	let obj = null
	switch (action.type) {
		case 'GET_BABYBAREXAM_JSON_FULFILLED':
			obj = state.baby_bar_exam;
			obj[action.payload.subject] = action.payload.data;
			state = {
				...state,
				baby_bar_exam: obj
			}
			break;
		case 'GET_BABYBARRULES_FULFILLED':
			state = {
				...state,
				baby_bar_rules: action.payload
			}
			break;
		case 'CHANGE_START_TIME':
			state = {
				...state,
				startTime: action.payload
			}
			break;
		case 'GET_SUBJECTS_JSON_FULFILLED':
			state = {
				...state,
				subjects: action.payload
			}
			break;
		case 'GET_SUBJECT_JSON':
			state = {
				...state,
				subject: action.payload
			}
			break;
		case 'GET_ISSUE_JSON_FULFILLED':
			obj = state.issue;
			obj[action.payload.subject] = obj[action.payload.subject] || {};
			obj[action.payload.subject][action.payload.issue] = action.payload.data;
			state = {
				...state,
				issue: obj
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