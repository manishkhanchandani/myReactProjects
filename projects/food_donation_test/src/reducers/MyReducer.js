const MyReducer = (state = {
	email: null,
	displayName: null,
	photoURL: null,
	uid: null,
	profile_uid: null,
	providerId: null,
    createPostMessage: null,
	query1Data: null,
	query2Data: null
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
		case 'QUERY1_FULFILLED':
			state = {
				...state,
				query1Data: action.payload
			}
        break;
		case 'QUERY2_FULFILLED':
			state = {
				...state,
				query2Data: action.payload
			}
        break;
		default:
			break;
	}
	
	return state;
};

export default MyReducer;