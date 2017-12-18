const IssuesReducer = (state = {
	subjects: null
}, action) => {
	switch (action.type) {
		case 'GET_SUBJECTS':
			state = {
				...state,
				subjects: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default IssuesReducer;