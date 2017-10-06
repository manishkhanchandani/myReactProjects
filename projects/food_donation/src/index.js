import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from './MyFirebase.js';


firebaseApp.auth().onAuthStateChanged((user) => {
	console.log('user is ', user);
	if (user) {
		console.log('user is logged in ');	
		var obj = {};
		obj.email = user.email;
		obj.displayName = user.displayName;
		obj.photoURL = user.photoURL;
		obj.uid = user.uid;
		obj.profile_uid = user.providerData[0].uid;
		obj.providerId = user.providerData[0].providerId;
		console.log('obj2: ', obj);
	} else {
		console.log('user is logged out');	
	}
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
