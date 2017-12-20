import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {dynamicSort, timeAgo} from '../../utilities/functions.js';

export const getSimpleQuizAnswers = (u, s, i) => {
	return {
		type: 'SIMPLE_QUIZ_ANSWERS',
		payload: new Promise((resolve, reject) => {
			let uidPath = '/' + u;
			let subject = '/' + s;
			let issue = '/' + i;
			var url = FirebaseConstant.basePath + '/quiz/simple_quiz' + uidPath + subject + issue;
			var ref = firebaseDatabase.ref(url).limitToLast(500);
			ref.once('value', (snapshot) => {
				var result = snapshot.val();
	
				if (!result) {
					resolve(null);
					return;
				}
				var myArray = [];
				for (var key in result) {
					var obj = result[key];
					obj.dt = timeAgo(obj.created_dt);
					obj.id = key;
					myArray.push(obj);
				}

				//sorting
				myArray.sort(dynamicSort('-created_dt'));
				
				resolve(myArray);
			});	
		})
	}
}