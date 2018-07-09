//import config from '../config.js';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


export const onListEssays = (dispatch, subject) => {
	if (!subject) return null;
	let url = FirebaseConstant.basePath + '/essays/' + subject;
	let ref = firebaseDatabase.ref(url).orderByChild('status').equalTo(1).limitToLast(500);
	ref.on('child_added', (snapshot) => {
		var result = snapshot.val();
		if (!result) {
			return;
		}
		/*let myVar = [];
		for (let key in result) {
			if (result[key].status !== 1) {
				continue;	
			}
			myVar.push(result[key]);
		}
		dispatch(listEssaysResult(myVar));*/
		if (!result.id) result.id = snapshot.key;
		dispatch(listEssaysObjResult(result));
	});
	
};

export const listEssaysResult = (result) => {
	return {
		type: 'LIST_ESSAYS',
		payload: result
	};
};
export const listEssaysObjResult = (result) => {
	return {
		type: 'LIST_ESSAYS_OBJ',
		payload: result
	};
};

export const listEssays = (subject, params={}, dispatch=null, callback=null) => {
	return {
		type: 'LIST_ESSAYS',
		payload: new Promise((resolve, reject) => {
			let url = FirebaseConstant.basePath + '/essays';
			let ref = firebaseDatabase.ref(url).orderByChild('subject').equalTo(subject).limitToLast(500);
			ref.on('value', (snapshot) => {
				var result = snapshot.val();
				if (!result) {
					resolve(null);
					return;
				}
				let myVar = [];
				//let sel = false;
				//let first = null;
				for (let key in result) {
					if (result[key].status !== 1) {
						continue;	
					}
					myVar.push(result[key]);
					/*if (!first) {
						first = result[key];
					}
					if (dispatch && params.id && key && params.id === key) {
						dispatch(selectedEssay(result[key]));
						sel = true;
					}*/
				}
				
				/*if (!sel && first) {
					dispatch(selectedEssay(first));				
				}*/
				
				if (callback) {
					callback(myVar);	
				}

				resolve(myVar);
			});
		})
	};
};


export const selectedEssay = (essay) => {
	return {
		type: 'SELETECTED_ESSAY',
		payload: essay
	};
};


export const initSelectedEssay = (dispatch, subject, essay, past) => {
	console.log('past is ', past);
	console.log('essay is ', essay);
	if (past) {
		let urlPast = FirebaseConstant.basePath + '/essays/' + subject + '/' + past;
		let refPast = firebaseDatabase.ref(urlPast);
		refPast.off();
	}
	let url = FirebaseConstant.basePath + '/essays/' + subject + '/' + essay;
	let ref = firebaseDatabase.ref(url);
	ref.on('value', (snapshot) => {
		var result = snapshot.val();
		if (!result.id) result.id = snapshot.key;
		dispatch(selectedEssay(result));
	});
	
	return {
		type: 'SELETECTED_ESSAY',
		payload: essay
	};
};

export const postNewEssay = (subject, details, callback=null) => {
	return {
		type: 'POST_NEW_ESSAY',
		payload: new Promise((resolve, reject) => {
			let url = FirebaseConstant.basePath + '/essays/'+subject;
			let uniqueID = firebaseDatabase.ref(url).push(details).key;
			firebaseDatabase.ref(url).child(uniqueID).child('id').set(uniqueID);
			if (callback) {
				callback(uniqueID);	
			}
			if (details.emails && details.type === 'private') {
				let emails = details.emails.split(',');
				for (let k in emails) {
					let email = emails[k].trim();
					let urlUser = FirebaseConstant.basePath + '/users';
					let refUser = firebaseDatabase.ref(urlUser).orderByChild('email').equalTo(email).limitToLast(1);
					refUser.once('child_added', (snapshot) => {
						let r = snapshot.val();
						firebaseDatabase.ref(url).child(uniqueID).child('uids').child(r.uid).set(email);
					});
				}
			}
			resolve(uniqueID);
		})
	};
	
};

export const deleteEssay = (essay_id) => {};

export const addUpdateIssue = (essay_id, subject, details, callback=null) => {
	return {
		type: 'POST_NEW_ISSUE',
		payload: new Promise((resolve, reject) => {
			let url = FirebaseConstant.basePath + '/essays/'+subject+'/'+essay_id+'/issues';
			let uniqueID = firebaseDatabase.ref(url).push(details).key;
			firebaseDatabase.ref(url).child(uniqueID).child('id').set(uniqueID);
			if (callback) {
				callback(uniqueID);	
			}
			resolve(uniqueID);
		})
	};
};

export const listIssues = (essay_id) => {};

export const deleteIssue = (essay_id, issue_id) => {};
