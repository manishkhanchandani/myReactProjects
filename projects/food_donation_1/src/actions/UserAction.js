import UserConstant from '../constants/UserConstant.js';

export const loginUser = (obj) => {
	return {
		type: UserConstant.SIGNED_IN,
		payload: obj
	};
};


export const logoutUser = () => {
	return {
		type: UserConstant.SIGNED_OUT,
		payload: null
	};
};
