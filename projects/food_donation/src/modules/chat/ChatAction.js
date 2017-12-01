import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {dynamicSort} from '../../utilities/functions.js';

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
			if (!toUserId) {
				resolve(null);
			}
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

export const getChatUsersAction = (dispatch) => {	
	var uid = localStorage.getItem('userId');
	
	if (!uid) {
		return false;	
	}
	
	var url = FirebaseConstant.basePath + '/chat/chatUsers';
	var ref = firebaseDatabase.ref(url).child(uid);//uid is person who is logged in
	ref.off();
	ref.on('value', (snapshot) => {
		var chatUsers = [];
		var result = snapshot.val();
		if (!result) {
			return;	
		}
		
		var totalCount = 0;
		for (let key in result) {
			chatUsers.push(result[key]);
			
			if (result[key].cnt) {
				totalCount = totalCount + result[key].cnt;	
			}
		}

		dispatch({
			type: 'GET_CHAT_USERS_TOTAL_COUNT',
			payload: totalCount
		});
		
		chatUsers.sort(dynamicSort('-updated_dt'));
		
		dispatch({
			type: 'GET_CHAT_USERS',
			payload: chatUsers
		});
	});
}