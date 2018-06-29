
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

export const removeOnline = () => {
	/*console.log('user removed from online system');
	let uid = getUID();
	console.log('user with id ', uid);
	if (uid) {
		let url = FirebaseConstant.basePath + '/online_users/' + uid;
		console.log('user with url ', url);
		firebaseDatabase.ref(url).set(null);
	}*/
}

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
						obj.access_level = 'member';
					}
					
					firebaseDatabase.ref(url).update(obj);
					window.location.reload();
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
	removeOnline();
	return {
		type: 'MAIN_SIGNOUT',
		payload: new Promise((resolve, reject) => {
			firebaseApp.auth().signOut().then(function() {
				resolve({});						   
			});
		})
	};	
};

export const onlinePresence = (data) => {
	return {
		type: 'ONLINE_PRESENCE',
		payload: data
	};	
};


export const FirebaseAuthSystem = (dispatch) => {
	firebaseApp.auth().onAuthStateChanged((user) => {
		if (user) {
			var url = FirebaseConstant.basePath + '/users/' + user.uid;
			firebaseDatabase.ref(url).once('value').then((snapshot) => {
				let result = snapshot.val();
				if (!result) {
					dispatch(loggedOut());
					return;
				}

				if (result.ban === 1) {
					alert('Account is unauthorized, contact admin at admin@calbabybar.com');
					dispatch(loggedOut());
					return;
				}

				var obj = {};
				obj.email = result.email;
				obj.displayName = result.displayName;
				obj.photoURL = result.photoURL;
				obj.uid = user.uid;
				obj.profile_uid = result.profile_uid;
				obj.providerId = result.providerId;
				obj.access_level = result.access_level;
				localStorage.setItem('usersObject', JSON.stringify(obj));
				dispatch(loggedIn(obj));
			});
			
			/*console.log('user added in online system');
			let uobj = {
				uid: obj.uid,
				name: obj.displayName,
				img: obj.photoURL,
				in_time: firebase.database.ServerValue.TIMESTAMP
			};
			let url = FirebaseConstant.basePath + '/online_users/' + obj.uid;
			firebaseDatabase.ref(url).set(uobj);*/
		} else {
			dispatch(loggedOut());
		}
	});
	
	/*
	let urlX = FirebaseConstant.basePath + '/online_users';
	firebaseDatabase.ref(urlX).on('value', (snapshot) => {
		let result = snapshot.val();
		console.log('online users is ', result);
		var myArray = [];
		for (var key in result) {
			var obj = result[key];
			obj.dt = timeAgo(obj.in_time);
			myArray.push(obj);
		}
		
		//sorting
		myArray.sort(dynamicSort('-in_time'));
		
		dispatch(onlinePresence(myArray));
	});*/
};
