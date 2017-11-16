import * as firebase from 'firebase';

// Initialize Firebase ...
var config = {
    apiKey: "AIzaSyD3BsiZanPMQDjNw2MRCh6pandi9bwLgO8",
    authDomain: "myreact-c1c5b.firebaseapp.com",
    databaseURL: "https://myreact-c1c5b.firebaseio.com",
    projectId: "myreact-c1c5b",
    storageBucket: "myreact-c1c5b.appspot.com",
    messagingSenderId: "229642844954"
  };

export const FirebaseConstant = {
	basePath: '/food_donation'	
};

export const firebaseApp =  firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();