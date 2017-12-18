
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

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
	}