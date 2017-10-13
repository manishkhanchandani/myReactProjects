const FoodDonationReducer = (state = {
    createPostMessage: null
}, action) => {
	switch (action.type) {
        case 'CREATE_POST_FULFILLED':
            state = {
                ...state,
                createPostMessage: 'Post Created Successfully.'
            }
            break;
		default:
			break;
	}
	
	return state;
};

export default FoodDonationReducer;