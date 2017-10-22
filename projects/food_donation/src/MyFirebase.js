import * as firebase from 'firebase';

// Initialize Firebase
/* var config = {
	apiKey: "AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk",
	authDomain: "project100-fe20e.firebaseapp.com",
	databaseURL: "https://project100-fe20e.firebaseio.com",
	projectId: "project100-fe20e",
	storageBucket: "project100-fe20e.appspot.com",
	messagingSenderId: "674827815611"
}; */

var config = {
  apiKey: "AIzaSyBKQuFR9UuZvXKyDDvNNRGDZnb6opwDQmk",
  authDomain: "my-not-awesome-project-1288d.firebaseapp.com",
  databaseURL: "https://my-not-awesome-project-1288d.firebaseio.com",
  projectId: "my-not-awesome-project-1288d",
  storageBucket: "my-not-awesome-project-1288d.appspot.com",
  messagingSenderId: "839030319019"
};
firebase.initializeApp(config);
/* 
// npm install firebase@4.5.0 --save
var config = {
    apiKey: "AIzaSyD3BsiZanPMQDjNw2MRCh6pandi9bwLgO8",
    authDomain: "myreact-c1c5b.firebaseapp.com",
    databaseURL: "https://myreact-c1c5b.firebaseio.com",
    projectId: "myreact-c1c5b",
    storageBucket: "myreact-c1c5b.appspot.com",
    messagingSenderId: "229642844954"
  }; */

export const FirebaseConstant = {
	basePath: '/food_donation'
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();
