const FoodDonationReducer = (state = {data:null}, action) => {
	switch (action.type) {
		case 'BROWSE':
			state = {
				...state,
				data: action.payload
			};
			break;
		default:
			break;
	}
	
	return state;
};

export default FoodDonationReducer;