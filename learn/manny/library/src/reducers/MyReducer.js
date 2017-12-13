const MyReducer = (state = {
	email: null,
	displayName: null,
	photoURL: null,
	uid: null,
	profile_uid: null,
	providerId: null,
	toUserId: null,
	toUserIdDetails: null
}, action) => {
	switch (action.type) {
		case 'LOGGEDIN':
			state = {
				...state,
				email: action.email,
				displayName: action.displayName,
				photoURL: action.photoURL,
				uid: action.uid,
				profile_uid: action.profile_uid,
				providerId: action.providerId
			}
			break;
		case 'LOGGEDOUT':
			state = {
				...state,
				email: null,
				displayName: null,
				photoURL: null,
				uid: null,
				profile_uid: null,
				providerId: null
			}
			break;
		case 'GOOGLELOGIN_FULFILLED':
			state = {
				...state
			}
			break;
		case 'MAIN_SIGNOUT_FULFILLED':
			state = {
				...state
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default MyReducer;