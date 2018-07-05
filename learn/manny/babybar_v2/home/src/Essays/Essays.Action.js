import config from '../config.js';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

export const onListEssays = (dispatch, subject) => {
	let url = FirebaseConstant.basePath + '/essays';
	let ref = firebaseDatabase.ref(url).orderByChild('subject').equalTo(subject).limitToLast(500);
	ref.on('value', (snapshot) => {
		var result = snapshot.val();
		if (!result) {
			dispatch(listEssaysResult(null));
		}
		let myVar = [];
		for (let key in result) {
			if (result[key].status !== 1) {
				continue;	
			}
			myVar.push(result[key]);
		}
		dispatch(listEssaysResult(myVar));
	});
};

export const listEssaysResult = (result) => {
	return {
		type: 'LIST_ESSAYS',
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

export const postNewEssay = (details, callback=null) => {
	return {
		type: 'POST_NEW_ESSAY',
		payload: new Promise((resolve, reject) => {
			let url = FirebaseConstant.basePath + '/essays';
			let uniqueID = firebaseDatabase.ref(url).push(details).key;
			firebaseDatabase.ref(url).child(uniqueID).child('id').set(uniqueID);
			if (callback) {
				callback(uniqueID);	
			}
			resolve(uniqueID);
		})
	};
	
};

export const deleteEssay = (essay_id) => {};

export const addUpdateIssue = (essay_id, details) => {};

export const listIssues = (essay_id) => {};

export const deleteIssue = (essay_id, issue_id) => {};
