import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store.js';
import {firebaseApp} from './MyFirebase.js';
import {loggedIn, loggedOut} from './actions/MyAction.js';
import App from './App.js';
import './style.css';


firebaseApp.auth().onAuthStateChanged((user) => {
	if (user) {
		var obj = {};
		obj.email = user.email;
		obj.displayName = user.displayName;
		obj.photoURL = user.photoURL;
		obj.uid = user.uid;
		obj.profile_uid = user.providerData[0].uid;
		obj.providerId = user.providerData[0].providerId;
		localStorage.setItem('usersObject', JSON.stringify(obj));
		store.dispatch(loggedIn(obj));									  
	} else {
		store.dispatch(loggedOut());
	}
});


ReactDOM.render((
    <Provider store={store}>
		<BrowserRouter>
		<App />
	  </BrowserRouter>
	</Provider>
),document.getElementById('root'));
registerServiceWorker();