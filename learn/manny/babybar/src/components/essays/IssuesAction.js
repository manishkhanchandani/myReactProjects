import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {dynamicSort, timeAgo} from '../../utilities/functions.js';

export const ajaxGetCall = (url, resolve, reject) => {
	fetch(url, {
		method: 'GET'	  
	}).then((response) => {
		return response.json();
	}).then((j) => {
		console.log('j is ', j);
		resolve(j);
	}).catch((err) => {
		console.log('err is ', err);
		reject(err);
	});
};

export const selectIssueJson = (dispatch, subject=null, issue=null) => {
	if (!subject || !issue) {
		return {
			type: 'ERROR_SUBJECT_ISSUE'	
		};
	}

	return {
		type: 'GET_ISSUE_JSON',
		payload: new Promise((resolve, reject) => {
			let url = '/assets/json/'+subject+'/'+issue+'.json';
			fetch(url, {
				method: 'GET'	  
			}).then((response) => {
				return response.json();
			}).then((j) => {
				console.log('issue json is ', j);
				resolve(j);
			}).catch((err) => {
				console.log('err is ', err);
				reject(err);
			});					  
		})
	}
}

export const getSubjectResultJson = (result) => {
	return {
		type: 'GET_SUBJECT_JSON',
		payload: result
	}	
}

export const getSubjectsJson = (dispatch, subject=null) => {
	return {
		type: 'GET_SUBJECTS_JSON',
		payload: new Promise((resolve, reject) => {
			let url = '/assets/json/subjects.json';
			fetch(url, {
				method: 'GET'	  
			}).then((response) => {
				return response.json();
			}).then((j) => {
				console.log('subject json is ', j);
				if (subject) {
					dispatch(getSubjectResultJson(j[subject]));
				}
				resolve(j);
			}).catch((err) => {
				console.log('err is ', err);
				reject(err);
			});					  
		})
	}
}
/*

export const getSubjectsResult = (result) => {
	return {
		type: 'GET_SUBJECTS',
		payload: result
	}	
}

export const getSubjectResult = (result) => {
	return {
		type: 'GET_SUBJECT',
		payload: result
	}	
}


export const getIssuesResult = (result) => {
	return {
		type: 'GET_ISSUES',
		payload: result
	}	
}

export const getIssueResult = (result) => {
	return {
		type: 'GET_ISSUE',
		payload: result
	}	
}

export const getSubjects = (dispatch, subject=null, issue=null) => {
	var url = FirebaseConstant.basePath + '/quiz/subjects';
	var ref = firebaseDatabase.ref(url);
	ref.once('value', (snapshot) => {
		var result = snapshot.val();
		dispatch(getSubjectsResult(result));
		if (subject) {
			dispatch(getSubjectResult(result[subject]));
			selectSubject(dispatch, result, subject, issue);
		}		
	});
}

export const selectSubject = (dispatch, subjects=null, subject=null, issue=null) => {
	if (!subjects) {
		return;	
	}		
	var urlIssue = FirebaseConstant.basePath + '/quiz/issues/'+subject;
	var refIssue = firebaseDatabase.ref(urlIssue);
	refIssue.once('value', (snapshot) => {
		var result = snapshot.val();	
		dispatch(getIssuesResult(result));
		if (issue) {
			dispatch(getIssueResult(result[issue]));
		}			
	});
}*/

export const getIssueAnswers = (u, s, i) => {
	return {
		type: 'ISSUE_ANSWERS',
		payload: new Promise((resolve, reject) => {
			let uidPath = '/' + u;
			let subject = '/' + s;
			let issue = '/' + i;
			var url = FirebaseConstant.basePath + '/quiz/issues_answers' + uidPath + subject + issue;
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

