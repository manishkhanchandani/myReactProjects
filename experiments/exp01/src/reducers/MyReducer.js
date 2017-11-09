const MyReducer = (state = {
	query1Data: null,
	query2Data: null
}, action) => {
	switch (action.type) {
		case 'QUERY1_FULFILLED':
			state = {
				...state,
				query1Data: action.payload
			}
        break;
		case 'QUERY2_FULFILLED':
			state = {
				...state,
				query2Data: action.payload
			}
        break;
		default:
			break;
	}
	
	return state;
};

export default MyReducer;