import UserConstant from '../constants/UserConstant.js';
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

export const loginUser = (obj) => {
	localStorage.setItem('simpleObj', JSON.stringify(obj));
	return {
		type: UserConstant.SIGNED_IN,
		payload: obj
	};
};


export const logoutUser = () => {
	return {
		type: UserConstant.SIGNED_OUT,
		payload: null
	};
};

export const googleLogin = () => {
	return {
		type: UserConstant.GOOGLE_lOGIN,
		payload: new Promise((resolve, reject) => {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebaseApp.auth().signInWithPopup(provider).then(function(result) {
				var obj = {};
				obj.name = result.user.displayName;
				obj.email = result.user.email;
				obj.image = result.user.photoURL;
				obj.uid = result.user.uid;
				obj.provider_uid = result.user.providerData[0].uid;
				obj.loggedIn = firebase.database.ServerValue.TIMESTAMP;
				var url = FirebaseConstant.basePath + '/users/' + obj.uid;
				
				firebaseDatabase.ref(url).once('value').then((snapshot) => {
					if (!snapshot.exists()) {
						obj.createdDate = firebase.database.ServerValue.TIMESTAMP;
					}
					firebaseDatabase.ref(url).update(obj);
					resolve({});
				});
			});			  
		})
	};
};


export const firebaseSignOut = () => {
	return {
		type: UserConstant.FIREBASE_SIGNED_OUT,
		payload: new Promise((resolve, reject) => {
			firebaseApp.auth().signOut().then(function() {
				resolve({});								   
			});					  
		})
	};
};