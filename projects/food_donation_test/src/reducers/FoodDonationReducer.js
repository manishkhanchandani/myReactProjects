const FoodDonationReducer = (state = {
    createPostMessage: null,
    postId: null
}, action) => {
	switch (action.type) {
        case 'CREATE_POST_FULFILLED':
            state = {
                ...state,
                createPostMessage: 'Post Created Successfully.',
                postId: action.payload.postId
            }
            break;
		default:
			break;
	}
	
	return state;
};

export default FoodDonationReducer;