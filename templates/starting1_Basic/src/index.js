import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';

import store from './store.js';
import {firebaseApp} from './MyFirebase.js';
import {loggedIn, loggedOut} from './actions/MyAction.js';
import Main from './Main.js';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';


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
	} else {
		store.dispatch(loggedOut());
	}
});


ReactDOM.render((
    <Provider store={store}>
		<Main />
	</Provider>
),document.getElementById('root'));
registerServiceWorker();