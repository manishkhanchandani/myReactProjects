const MyFlixReducer = (state = {
	list: null,
	listData: null,
	categories: null,
	showCategories: null,
	catValues: null
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
		case 'MYFLIX_CATEGORIES':
			state = {
				...state,
				categories: action.categories,
				showCategories: action.showCategories
			}
			break;
		case 'MYFLIX_CATEGORY_VALUE':
			state = {
				...state,
				catValues: action.payload
			}
			break;
		default:
			break;
	}

	return state;
};

export default MyFlixReducer;