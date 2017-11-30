const ChatReducer = (state = {
	toUserId: null,
	toUserDetails: null,
	chatMessageCnt: null,
	chatUsers: null
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
		case 'CHAT_MESSAGE_CNT':
			state = {
				...state,
				chatMessageCnt: action.payload
			};
			break;
		case 'CHAT_USERS':
			state = {
				...state,
				chatUsers: action.payload
			};
			break;
		default:
			break;
	}
	
	return state;
};

export default ChatReducer;