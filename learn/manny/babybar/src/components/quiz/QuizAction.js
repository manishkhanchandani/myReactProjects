import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getRandomizer, dynamicSort, timeAgo} from '../../utilities/functions.js';
import {getUID, getUsersObj} from '../auth/AuthAction.js';

export const createQuiz = (topic) => {
	return {
		type: 'CREATE_QUIZ',
		payload: new Promise((resolve, reject) => {
			
			const uid = getUID();
			const uObject = getUsersObj();
			var obj = {};
			obj.creator = uObject.displayName;
			obj.uid = uObject.uid;
			obj.photoURL = uObject.photoURL;
			obj.topicKey = topic.key;
			obj.topic = topic.name;
			obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
			obj.status = 'Pending';
			
			obj.questions = [];
			//find min and max question number for topic
			var num = 0;
			var tmpObj = {};
			var randomNumber = getRandomizer(0, 99);
			while (num < 5) {
				var tmp = randomNumber();
				if (!tmpObj[tmp]) {
					tmpObj[tmp] = 1;
					obj.questions.push(tmp);
					num++;
				}
			}
		
			var url = FirebaseConstant.basePath + '/quiz/posts';
			var uniqueID = firebaseDatabase.ref(url).push(obj).key;
			firebaseDatabase.ref(url).child(uniqueID).child('id').set(uniqueID);
			resolve(uniqueID);
			
		})
	};
}

export const listQuizResult = (data, error=null) => {
	return {
		type: 'LIST_QUIZ_RESULT',
		payload: data,
		error: error
	};	
}

export const deleteRecord = (id) => {
	var url = FirebaseConstant.basePath + '/quiz/posts/'+id;
	console.log('url is ', url);
	firebaseDatabase.ref(url).set(null);
}

export const listQuiz = (dispatch) => {
	return {
		type: 'LIST_QUIZ',
		payload: new Promise((resolve, reject) => {
							  
							  
			var url = FirebaseConstant.basePath + '/quiz/posts';
			var ref = firebaseDatabase.ref(url).orderByChild('status').equalTo('Pending');
			ref.off();
			ref.on('value', (snapshot) => {
				var result = snapshot.val();
				if (!result) {
					dispatch(listQuizResult(null, 'No Challenges Available. Please Create one!!'));
					return;
				}
				var myArray = [];
				var current = new Date();
				var now = ((current.getTime() / 1000) - (10 * 60)) * 1000;
				console.log('result is ', result);
				for (var key in result) {
					var obj = result[key];
					console.log('obj is ', obj);
					if (obj.created_dt < now) {
						console.log('deleting record with id ', obj.id);
						deleteRecord(obj.id);
						continue;
					}
					obj.dt = timeAgo(obj.created_dt);
					myArray.push(obj);
				}
				
				//sorting
				myArray.sort(dynamicSort('-created_dt'));
				
				dispatch(listQuizResult(myArray, null));
			});
			
			
						
		})
	};
	
}