const AuthReducer = (state = {
	email: null,
	displayName: null,
	photoURL: null,
	uid: null,
	profile_uid: null,
	providerId: null,
	online_users: null
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
				providerId: action.providerId,
				access_level: action.access_level
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
		case 'ONLINE_PRESENCE':
			state = {
				...state,
				online_users: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default AuthReducer;