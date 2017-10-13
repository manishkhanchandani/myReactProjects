import * as firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk",
	authDomain: "project100-fe20e.firebaseapp.com",
	databaseURL: "https://project100-fe20e.firebaseio.com",
	projectId: "project100-fe20e",
	storageBucket: "project100-fe20e.appspot.com",
	messagingSenderId: "674827815611"
};

export const FirebaseConstant = {
	basePath: '/food_donation_test'	
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();
