
const initialState = {
	data: null,
	form_fields: {
		keyword: null,
		location: {
			formatted_address: ''	
		}
	}
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
		case 'SAVE_SEARCH_INFO':
			state = {
				...state,
				form_fields: action.payload
			}
			break;
			
		default:
			break;
	}
	
	
	return state;
};

export default FoodReducer