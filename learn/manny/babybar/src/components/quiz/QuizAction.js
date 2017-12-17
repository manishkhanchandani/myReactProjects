import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getRandomizer, dynamicSort, timeAgo} from '../../utilities/functions.js';
import {getUsersObj} from '../auth/AuthAction.js';

export const createQuiz = (topic) => {
	return {
		type: 'CREATE_QUIZ',
		payload: new Promise((resolve, reject) => {

			const uObject = getUsersObj();
			var obj = {};
			obj.user1_creator = uObject.displayName;
			obj.user1_uid = uObject.uid;
			obj.user1_photoURL = uObject.photoURL;
			obj.topicKey = topic.key;
			obj.topic = topic.name;
			obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
			obj.status = 'Pending';
			
			obj.questions = [];
			//find min and max question number for topic
			var maxCnt = topic.cnt;
			var num = 0;
			var tmpObj = {};
			var randomNumber = getRandomizer(0, (maxCnt - 1));
			while (num < 5) {
				var tmp = randomNumber();
				if (!tmpObj[tmp]) {
					tmpObj[tmp] = 1;
					obj.questions.push(tmp);
					num++;
				}
			}
			obj[uObject.uid] = {
				points: 0	
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
				for (var key in result) {
					var obj = result[key];
					if (obj.created_dt < now) {
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

export const startedQuizResult = (data, error=null) => {
	return {
		type: 'STARTED_QUIZ_RESULT',
		payload: data,
		error: error
	};	
}


export const startedQuiz = (dispatch) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	var ref = firebaseDatabase.ref(url).orderByChild('status').equalTo('Started');
	ref.off();
	ref.on('value', (snapshot) => {
		var result = snapshot.val();
		if (!result) {
			dispatch(startedQuizResult(null, 'No Challenges Available!!'));
			return;
		}

		var myArray = [];
		for (var key in result) {
			var obj = result[key];
			obj.dt = timeAgo(obj.created_dt);
			obj.dtAccepted = timeAgo(obj.accepted_dt);
			myArray.push(obj);
		}
		
		//sorting
		myArray.sort(dynamicSort('-created_dt'));
				
		dispatch(startedQuizResult(myArray, null));
	});
	
}



export const completedQuizResult = (data, error=null) => {
	return {
		type: 'COMPLETED_QUIZ_RESULT',
		payload: data,
		error: error
	};	
}


export const completedQuiz = (dispatch) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	var ref = firebaseDatabase.ref(url).orderByChild('status').equalTo('Completed');
	ref.off();
	ref.on('value', (snapshot) => {
		var result = snapshot.val();
		if (!result) {
			dispatch(completedQuizResult(null, 'No Past Challenges Available!!'));
			return;
		}

		var myArray = [];
		for (var key in result) {
			var obj = result[key];
			obj.dt = timeAgo(obj.created_dt);
			obj.dtAccepted = timeAgo(obj.accepted_dt);
			myArray.push(obj);
		}
		
		//sorting
		myArray.sort(dynamicSort('-created_dt'));
				
		dispatch(completedQuizResult(myArray, null));
	});
	
}


export const changeStatus = (id, status) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	firebaseDatabase.ref(url).child(id).child('status').set(status);
}


export const changeUser1Status = (id, status) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	firebaseDatabase.ref(url).child(id).child('user1_status').set(status);
}

export const changeUser2Status = (id, status) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	firebaseDatabase.ref(url).child(id).child('user2_status').set(status);
}

export const changeQuizDetailsUser1 = (id, key, value) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	firebaseDatabase.ref(url).child(id).child('quizDetails').child('user1').child(key).set(value);
}
export const changeQuizDetailsUser2 = (id, key, value) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	firebaseDatabase.ref(url).child(id).child('quizDetails').child('user2').child(key).set(value);
}
export const changeQuizDetails = (id, key, value) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	firebaseDatabase.ref(url).child(id).child('quizDetails').child('common').child(key).set(value);
}



export const selectedQuizResult = (id, data, error=null) => {
	return {
		type: 'SELECTED_QUIZ_RESULT',
		payload: data,
		key: id,
		error: error
	};	
}

export const getQuestions = (category_id) => {
	return {
		type: 'QUESTIONS',
		payload: new Promise((resolve, reject) => {
							  
							  
			var url = FirebaseConstant.basePath + '/quiz/questions/'+category_id;
			var ref = firebaseDatabase.ref(url);
			ref.once('value', (snapshot) => {
				var result = snapshot.val();
				if (!result) {
					resolve(null);
					return;
				}
				var myArray = [];
				for (var key in result) {
					var obj = result[key];
					myArray.push(obj);
				}
				
				resolve(myArray);
			});	
		})
	};
	
}

export const selectedQuiz = (id, dispatch) => {
	var url = FirebaseConstant.basePath + '/quiz/posts/'+id;
	var ref = firebaseDatabase.ref(url);

	ref.off();
	ref.on('value', (snapshot) => {
		var result = snapshot.val();
		if (!result) {
			dispatch(selectedQuizResult(id, null, 'No Challenges Available For ID ' + id + '.'));
			return;
		}
		result.dt = timeAgo(result.created_dt);
		if (result.accepted_dt) result.accepted_dt = timeAgo(result.accepted_dt);

		dispatch(selectedQuizResult(id, result, null));
	});
	
}

export const close = () => {
	return {
		type: 'CLOSE',
		showModal: false,
		currentRecord: null
	};
}
	
export const open = (rec) => {
	return {
		type: 'OPEN',
		showModal: true,
		currentRecord: rec
	};
}

export const deleteRecord = (id) => {
	var url = FirebaseConstant.basePath + '/quiz/posts';
	firebaseDatabase.ref(url).child(id).set(null);
	return close();
}