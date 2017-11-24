
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {dynamicSort} from '../utilities/functions.js';


export const browseFoodDonation = (params) => {
	return {
		type: 'BROWSE',
		payload: params
	};
};

export const updateKeyword = (keyword) => {
	return {
		type: 'UPDATE_KEYWORD',
		payload: keyword
	}
};


export const updateLocation = (location) => {
	return {
		type: 'UPDATE_LOCATION',
		payload: location
	}
};


export const updateBoundary = (boundary) => {
	return {
		type: 'UPDATE_BOUNDARY',
		payload: boundary
	}
};

export const displayChatMessage = (toUid, dispatch, oldUid=null) => {
	var userObjStr = localStorage.getItem('userObj');
	var userObj = JSON.parse(userObjStr);
	var fromUid = userObj.uid;
	if (!fromUid) {
		return false;	
	}
	if (!toUid) {
		return false;	
	}
	var url = FirebaseConstant.basePath + '/chat/messages';
	var ref = firebaseDatabase.ref(url).child(fromUid).child(toUid).limitToLast(500);
	
	if (oldUid) {
		console.log('removing link');
		var refOld = firebaseDatabase.ref(url).child(fromUid).child(oldUid);
		refOld.off();
	}

	var myArray = [];
	ref.on('child_added', (snapshot) => {
		var result = snapshot.val();
		myArray.push(result);
		/*for (var key in result) {				
			myArray.push(result[key]);
		}*/
		
		//sorting
		myArray.sort(dynamicSort('-message_date'));
		
		//filtering
		
		//pagination

		dispatch({
			type: 'DISPLAY_CHAT_MESSAGE',
			payload: myArray
		});
	});
};

