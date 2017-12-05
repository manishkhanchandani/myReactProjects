import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import store from './store.js';
import {firebaseApp} from './MyFirebase.js';
import {loggedIn, loggedOut} from './actions/MyAction.js';
import {getChatUsersAction} from './modules/chat/ChatAction.js';


firebaseApp.auth().onAuthStateChanged((user) => {
	if (user) {
		var obj = {};
		obj.email = user.email;
		obj.displayName = user.displayName;
		obj.photoURL = user.photoURL;
		obj.uid = user.uid;
		obj.profile_uid = user.providerData[0].uid;
		obj.providerId = user.providerData[0].providerId;
		store.dispatch(loggedIn(obj));
		getChatUsersAction(store.dispatch);
	} else {
		store.dispatch(loggedOut());
	}
});

ReactDOM.render(
				<Provider store={store}>
				<App />
				</Provider>
				, document.getElementById('root'));
registerServiceWorker();
