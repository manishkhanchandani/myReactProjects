
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

export const changeUserId = (newUserId) => {
	return {
		type: 'CHANGE_USER_ID',
		payload: newUserId
	};
};

export const changeUserDetails = (toUserId) => {
	return {
		type: 'CHANGE_USER_DETAILS',
		payload: new Promise((resolve, reject) => {
			var url = FirebaseConstant.basePath + '/users/' + toUserId;
				
			firebaseDatabase.ref(url).once('value').then((snapshot) => {
				if (!snapshot.exists()) {
					//do something, TODO LIST, may be give some error	 
				}

				resolve(snapshot.val());
			});
		})
	};
};