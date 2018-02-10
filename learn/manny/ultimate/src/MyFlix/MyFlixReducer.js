const MyFlixReducer = (state = {
	list: null,
	listData: null
}, action) => {
	switch (action.type) {
		case 'CHANGE_LIST':
			state = {
				...state,
				list: action.payload
			}
			break;
		case 'MYFLIX_GET_LIST_DATA_FULFILLED':
			state = {
				...state,
				listData: action.payload
			}
			break;
		default:
			break;
	}

	return state;
};

export default MyFlixReducer;