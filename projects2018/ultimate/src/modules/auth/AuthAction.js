import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';


export const loggedIn = (params) => {
	localStorage.setItem('userObj', JSON.stringify(params));
	localStorage.setItem('userId', params.uid);
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
	localStorage.removeItem('userObj');
	localStorage.removeItem('userId');
	localStorage.removeItem('refreshToken');
	return {
		type: 'LOGGEDOUT'	
	};	
};

export const actionSignOut = () => {
	return {
		type: 'MAIN_SIGNOUT',
		payload: new Promise((resolve, reject) => {
			firebaseApp.auth().signOut().then(function() {
				setTimeout(() => {window.location.href="/";}, 1000);
				resolve({});						   
			});
		})
	};	
};


export const FirebaseLogin = (type, additionalParams=null) => {
	var provider = null;

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
				obj.refreshToken = result.user.refreshToken;
				localStorage.setItem('refreshToken', obj.refreshToken);
				var url = FirebaseConstant.basePath + '/users/' + obj.uid;
				
				firebaseDatabase.ref(url).once('value').then((snapshot) => {
					if (!snapshot.exists()) {
						obj.createdDate = firebase.database.ServerValue.TIMESTAMP;	 
					}
					
					firebaseDatabase.ref(url).update(obj);
					setTimeout(() => {window.location.href="/";}, 1000);
					resolve(obj);
				});
			}).catch(function(error) {
				reject(error);
			});
		})
	};	
	
};

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

export const FirebaseAuthSystem = (dispatch) => {
	firebaseApp.auth().onAuthStateChanged((user) => {
		if (user) {
			var obj = {};
			obj.email = user.providerData[0].email;
			obj.displayName = user.providerData[0].displayName;
			obj.photoURL = user.providerData[0].photoURL;
			obj.uid = user.uid;
			obj.profile_uid = user.providerData[0].uid;
			obj.providerId = user.providerData[0].providerId;
			dispatch(loggedIn(obj));
		} else {
			dispatch(loggedOut());
		}
	});
}