const MyFlixReducer = (state = {
	list: null
}, action) => {
	switch (action.type) {
		case 'CHANGE_LIST':
			state = {
				...state,
				list: action.payload
			}
			break;
		default:
			break;
	}

	return state;
};

export default MyFlixReducer;