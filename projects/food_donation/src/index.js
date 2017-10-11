import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';

import store from './store.js';


import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from './MyFirebase.js';

import {loggedIn, loggedOut} from './actions/MyAction.js';


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
		store.dispatch(loggedIn(obj));
	} else {
		console.log('user is logged out');
		store.dispatch(loggedOut());
	}
});

ReactDOM.render(
				<Provider store={store}>
				<App />
				</Provider>
				, document.getElementById('root'));
registerServiceWorker();
