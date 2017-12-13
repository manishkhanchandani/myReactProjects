
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';


export const loggedIn = (params) => {
	localStorage.setItem('uid', params.uid);
	localStorage.setItem('authUserObject', JSON.stringify(params));
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
	localStorage.removeItem('uid');
	localStorage.removeItem('authUserObject');
	return {
		type: 'LOGGEDOUT'	
	};	
};

export const getUID = () => {
	let uid = localStorage.getItem('uid');
	return uid;
};


export const getUsersObj = () => {
	let obj = localStorage.getItem('authUserObject');
	if (!obj) {
		return null;	
	}
	let usersObj = JSON.parse(obj);
	return usersObj;
};

export const FirebaseLogin = (type, additionalParams=null) => {
	var provider = new firebase.auth.GoogleAuthProvider();
	switch (type) {
		case 'GOOGLELOGIN':
			provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('profile');
			provider.addScope('email');
			break;
		case 'FACEBOOKLOGIN':
			provider = new firebase.auth.FacebookAuthProvider();
			break;
		case 'TWITTERLOGIN':
			provider = new firebase.auth.TwitterAuthProvider();
			break;
		case 'GITHUBLOGIN':
			provider = new firebase.auth.GithubAuthProvider();
			break;
		case 'EMAILLOGIN':
			provider = new firebase.auth.GoogleAuthProvider();
			break;
		default:
			break;
	}
	
	return {
		type: type,
		payload: new Promise((resolve, reject) => {
			firebaseApp.auth().signInWithPopup(provider).then(function(result) {
				var obj = {};
				obj.email = result.user.providerData[0].email;
				obj.displayName = result.user.providerData[0].displayName;
				obj.photoURL = result.user.providerData[0].photoURL;
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
}

export const actionGoogleLogin = () => {
	return FirebaseLogin('GOOGLELOGIN');	
};
export const actionFacebookLogin = () => {
	return FirebaseLogin('FACEBOOKLOGIN');	
};
export const actionTwitterLogin = () => {
	return FirebaseLogin('TWITTERLOGIN');	
};
export const actionGithubLogin = () => {
	return FirebaseLogin('GITHUBLOGIN');	
};
export const actionEmailLogin = () => {
	return FirebaseLogin('EMAILLOGIN');	
};


export const actionSignOut = () => {
	return {
		type: 'MAIN_SIGNOUT',
		payload: new Promise((resolve, reject) => {
			firebaseApp.auth().signOut().then(function() {
				resolve({});						   
			});
		})
	};	
};

export const FirebaseAuthSystem = (dispatch) => {
	firebaseApp.auth().onAuthStateChanged((user) => {
		if (user) {
			var obj = {};
			obj.email = user.email;
			obj.displayName = user.displayName;
			obj.photoURL = user.photoURL;
			obj.uid = user.uid;
			obj.profile_uid = user.providerData[0].uid;
			obj.providerId = user.providerData[0].providerId;
			localStorage.setItem('usersObject', JSON.stringify(obj));
			dispatch(loggedIn(obj));									  
		} else {
			dispatch(loggedOut());
		}
	});
};
