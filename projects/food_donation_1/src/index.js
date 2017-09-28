import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {firebaseApp} from './MyFirebase.js';

import './css/style.css';

import {Provider} from 'react-redux';
import store from './store.js';

import {loginUser, logoutUser} from './actions/UserAction.js';

firebaseApp.auth().onAuthStateChanged((user) => {
	if (user) {
		var obj = {};
		obj.name = user.displayName;
		obj.email = user.email;
		obj.image = user.photoURL;
		obj.refreshToken = user.refreshToken;
		obj.uid = user.uid;
		obj.provider_uid = user.providerData[0].uid;
		
		store.dispatch(loginUser(obj));
	} else {
		store.dispatch(logoutUser(obj));
	}
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
