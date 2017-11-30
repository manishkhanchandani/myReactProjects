
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

export const chatMessageCnt = (cnt) => {
	return {
		type: 'CHAT_MESSAGE_CNT',
		payload: cnt
	};
};

export const chat_user = (u) => {
	return {
		type: 'CHAT_USERS',
		payload: u
	};
};


export const getChatUsers = (dispatch) => {
	console.log('get chat users action started');
	var userObjStr = localStorage.getItem('userObj');
	var userObj = JSON.parse(userObjStr);
	var uid = userObj.uid;
	if (!uid) return null;
	
	var url = FirebaseConstant.basePath + '/chat/chatUsers';
	var ref = firebaseDatabase.ref(url).child(uid);//uid is person who is logged in
	
	ref.on('value', (snapshot) => {
		var chatUsers = [];
		var totalCount = 0;
		var result = snapshot.val();
		if (!result) {
			return;	
		}
		
		for (let key in result) {
			chatUsers.push(result[key]);
			if (result[key].cnt) {
				totalCount = totalCount + result[key].cnt;
			}
		}
		dispatch(chatMessageCnt(totalCount));
		chatUsers.sort(dynamicSort('-updated_dt'));
		dispatch(chat_user(chatUsers));
	});
	console.log('get chat users action ended');
}