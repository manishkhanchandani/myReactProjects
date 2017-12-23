import * as firebase from 'firebase';


let fb_path = '';
if (process.env.NODE_ENV === 'development') {
	fb_path = '/food_donation';
} else {
	fb_path = '/food_donation_live';
}

var config = {
    apiKey: "AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk",
	authDomain: "project100-fe20e.firebaseapp.com",
	databaseURL: "https://project100-fe20e.firebaseio.com",
	projectId: "project100-fe20e",
	storageBucket: "project100-fe20e.appspot.com",
	messagingSenderId: "674827815611"
  };

export const FirebaseConstant = {
	basePath: fb_path
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();
