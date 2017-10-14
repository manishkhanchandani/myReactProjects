import UserConstant from '../constants/UserConstant.js';

const initialState = {data: {}};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case UserConstant.SIGNED_IN:
			state = {
				...state,
				data: action.payload
			};
			break;
		case UserConstant.SIGNED_OUT:
			state = {
				...state,
				data: {}
			};
			break;
		default:
			break;
	}
	
	
	return state;
};

export default UserReducer