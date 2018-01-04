import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
// direct loggin
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
// direct logout
export const loggedOut = () => {
	localStorage.removeItem('userObj');
	localStorage.removeItem('userId');
	return {
		type: 'LOGGEDOUT'	
	};	
};
// third party login
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
		case 'EMAILREGISTER':
			console.log('additionalParams:', additionalParams);
			return{
				type: type,
				payload: new Promise((resolve, reject)=>{
					firebaseApp.auth().createUserWithEmailAndPassword(additionalParams.email,additionalParams.password).then((user)=>{
						console.log('user is ', user);
						
						if(user.emailVerified===false){
							console.log('email is not verified');
							user.sendEmailVerification().then((data)=>{
								console.log('email verification sent to user');								
							});					
						}
						
						
						
					    //
						resolve(user);					
			
					}).catch((error)=>{
	 					console.log('error is ', error);
						reject(error);
					});			  
								  
				})
			};			
			break;
			
		case 'EMAILLOGIN':
			return{
				type: type,
				payload: new Promise((resolve, reject)=>{
					firebaseApp.auth().signInWithEmailAndPassword(additionalParams.email,additionalParams.password).then((user)=>{
						console.log('user is ', user);
						
						resolve(user);					
			
					}).catch((error)=>{
	 					console.log('error is ', error);
						reject(error);
					});			  
								  
				})
			};			
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
					console.log('obj is ', obj);
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

export const actionEmailRegister = (email,password) => {
	let obj = {
		email,	    //email:email,es5  when key and value are same in es6 we can use that
		password	//password:password
	};	
	return FirebaseLogin('EMAILREGISTER', obj);
};


export const actionEmailLogin = (email,password) => {
	let obj = {
		email,	    //email:email,es5  when key and value are same in es6 we can use that
		password	//password:password	
	};
	return FirebaseLogin('EMAILLOGIN', obj);
};


export const FirebaseAuthSystem = (dispatch) => {
	firebaseApp.auth().onAuthStateChanged((user) =>{
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


