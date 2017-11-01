const FoodDonationReducer = (state = {
    createPostMessage: null,
    postId: null,
	data: null
}, action) => {
	switch (action.type) {
        case 'CREATE_POST_FULFILLED':
            state = {
                ...state,
                createPostMessage: 'Post Created Successfully.',
                postId: action.payload.postId
            }
            break;
		case 'BROWSE':
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

export default FoodDonationReducer;