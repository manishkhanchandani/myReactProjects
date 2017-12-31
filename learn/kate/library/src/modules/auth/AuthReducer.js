const AuthReducer = (state = {
					 
	email: null,
	displayName: null,
	photoURL: null,
	uid: null,
	profile_uid: null,
	providerId: null,
	error: null,
	processCompleted: false
	
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
		 case 'EMAILLOGIN_FULFILLED':
			state = {
				...state,
				email: action.payload.providerData[0].email,
				displayName: action.payload.providerData[0].displayName,
				photoURL: action.payload.providerData[0].photoURL,
				uid: action.payload.uid,
				profile_uid: action.payload.providerData[0].uid,
				providerId: action.payload.providerData[0].providerId,
				error: null,
				processCompleted: true
			}
			break;
		case 'EMAILLOGIN_REJECTED':
			state = {
				...state,
				email: null,
				displayName: null,
				photoURL: null,
				uid: null,
				profile_uid: null,
				providerId: null,
				error: action.payload.message,
				processCompleted: false
			}
			break;
		default:
			break;
	}

	return state;
};

export default AuthReducer;