import MyConstant from '../constants/MyConstant.js';

const initialState = {data: null};

const MyReducer = (state = initialState, action) => {
	switch (action.type) {
		case MyConstant.SAMPLE:
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

export default MyReducer