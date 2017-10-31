const FoodDonationReducer = (state = {
	data: null							 
}, action) => {
	switch (action.type) {
		case 'BROWSE_FULFILLED':
			state = {
				...state
			};
			break;
		default:
			break;
	}
	
	return state;
};

export default FoodDonationReducer;