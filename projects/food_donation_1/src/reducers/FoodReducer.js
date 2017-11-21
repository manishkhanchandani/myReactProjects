
const initialState = {
	data: null
};

const FoodReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_NEW_POST':
			break;
		case 'SEARCH_POST':
			break;
		case 'VIEW_POST':
			state = {
				...state,
				data: action.payload
			}
			break;
		default:
			break;
	}
	
	
	return state;
};

export default FoodReducer