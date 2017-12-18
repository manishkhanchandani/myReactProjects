const IssuesReducer = (state = {
	subjects: null,
	subject: null,
	issues: null,
	issue: null
}, action) => {
	switch (action.type) {
		case 'GET_SUBJECTS':
			state = {
				...state,
				subjects: action.payload,
				issues: null,
				issue: null
			}
			break;
		case 'GET_SUBJECT':
			state = {
				...state,
				subject: action.payload,
				issues: null,
				issue: null
			}
			break;
		case 'GET_ISSUES':
			state = {
				...state,
				issues: action.payload
			}
			break;
		case 'GET_ISSUE':
			state = {
				...state,
				issue: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default IssuesReducer;