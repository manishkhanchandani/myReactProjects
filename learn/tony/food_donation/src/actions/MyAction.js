import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFireBase.js';
import * as firebase from 'firebase';

export const loggedIn = (params) => {
	return {
		type: 'LOGGEDIN',
		email: params.email,
		displayName: params.displayName,
		photoURL: params.photoURL,
		uid: params.uid,
		profile_uid: params.uid,
		providerId: params.providerId
	};
};

export const loggedOut = () => {
	return {
		type: 'LOGGEDOUT'	
	};	
};

export const actionGoogleLogin = () => {
return {
	type: 'GOOGLELOGIN',
	payload: new Promise((resolve, reject) => {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebaseApp.auth().signInWithPopup(provider).then(function(result) {
			var obj = {};
			obj.email = result.user.email;
			obj.displayName = result.user.displayName;
			obj.photoURL = result.user.photoURL;
			obj.uid = result.user.uid;
			obj.profile_uid = result.user.providerData[0].uid;
			obj.providerId = result.user.providerData[0].providerId;
			obj.loggedIn = firebase.database.ServerValue.TIMESTAMP;
			var url = FirebaseConstant.basePath + '/users/' + obj.uid;
			
			firebaseDatabase.ref(url).once('value').then((snapshot) => {
				if (!snapshot.exists()) {
					obj.createdDate = firebase.database.ServerValue.TIMESTAMP;	 
				}
				
				firebaseDatabase.ref(url).update(obj);
				resolve(obj);
			});
		}).catch(function(error) {
			reject(error);
		});
	})
};	


export const actionSignOut = () => {
	firebaseApp.auth().signOut().then(function() {

	});
}