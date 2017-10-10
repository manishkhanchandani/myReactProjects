
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from '../MyFirebase.js';

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

export const googleLogin = () => {
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
                console.log('obj in glogin: ', obj);
                resolve(obj);
            }).catch(function(error) {
                reject(error);
            });
        })
	};
    
    
};