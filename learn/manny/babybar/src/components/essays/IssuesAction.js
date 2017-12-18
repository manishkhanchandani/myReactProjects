
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

export const getSubjectsResult = (result) => {
	return {
		type: 'GET_SUBJECTS',
		payload: result
	}	
}

export const getSubjects = (dispatch, subject=null) => {
	var url = FirebaseConstant.basePath + '/quiz/subjects';
	var ref = firebaseDatabase.ref(url);
	ref.once('value', (snapshot) => {
		var result = snapshot.val();
		dispatch(getSubjectsResult(result));
		/*this.setState({subjects: result}, () => {
			if (subject) {
				//this.selectSubject(this.props.match.params.subject);	
			}								   
		});*/
		
	});
}

export const selectSubject = (eventKey, subjects=null) => {
		//if (!this.props.match.params.subject) {
			//window.location.href = "/essays/issues/"+eventKey;
			//return;
		//}
		if (!subjects) {
			return;	
		}
		var value = subjects[eventKey];
		//this.setState({subjectKey: value.key, subject: value.name, issues: null, issue: null});
		
		var urlIssue = FirebaseConstant.basePath + '/quiz/issues/'+eventKey;
		var refIssue = firebaseDatabase.ref(urlIssue);
		refIssue.once('value', (snapshot) => {
			var result = snapshot.val();			
			this.setState({issues: result}, () => {
				if (this.props.match.params.issue) {
					this.selectIssue(this.props.match.params.issue);	
				}								 
			});
			
		});
	}