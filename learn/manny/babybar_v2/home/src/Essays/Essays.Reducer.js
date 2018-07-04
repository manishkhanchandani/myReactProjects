const EssaysReducer = (state = {
	data: null
}, action) => {
	switch (action.type) {
		case 'test':
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

export default EssaysReducer;