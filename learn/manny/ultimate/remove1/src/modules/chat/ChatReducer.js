const ChatReducer = (state = {
	toUserId: null,
	toUserDetails: null,
	chat_users_general: null,
	chat_users_total_cnt: null
}, action) => {
	switch (action.type) {
		case 'CHANGE_USER_ID':
			state = {
				...state,
				toUserId: action.payload
			};
			break;
		case 'CHANGE_USER_DETAILS_FULFILLED':
			state = {
				...state,
				toUserDetails: action.payload
			};
			break;
		case 'GET_CHAT_USERS':
			state = {
				...state,
				chat_users_general: action.payload
			};
			break;
		case 'GET_CHAT_USERS_TOTAL_COUNT':
			state = {
				...state,
				chat_users_total_cnt: action.payload
			};
			break;
		default:
			break;
	}
	
	return state;
};

export default ChatReducer;