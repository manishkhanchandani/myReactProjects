create-react-app projectname

default modules are:
"react": "^16.0.0",
"react-dom": "^16.0.0",
"react-scripts": "1.0.14"

To install redux, add following npm command
npm install --save redux react-redux redux-logger redux-thunk redux-promise-middleware

To insall react bootstrap add following
npm install --save react-bootstrap

To install firebase, add following
npm install --save firebase

To install router add following
npm install --save react-router-dom react-router



Create a folder components
Create a folder routes

Copy store.js in src:
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import MyReducer from './reducers/MyReducer.js';

const store = createStore(combineReducers({MyReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;

Copy MyFirebase.js in src folder
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk",
	authDomain: "project100-fe20e.firebaseapp.com",
	databaseURL: "https://project100-fe20e.firebaseio.com",
	projectId: "project100-fe20e",
	storageBucket: "project100-fe20e.appspot.com",
	messagingSenderId: "674827815611"
  };

export const FirebaseConstant = {
	basePath: '/some_folder_name'
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();


Copy reducers/MyReducer.js
const MyReducer = (state = {
	email: null,
	displayName: null,
	photoURL: null,
	uid: null,
	profile_uid: null,
	providerId: null
}, action) => {
	switch (action.type) {
		case 'LOGGEDIN':
			state = {
				...state,
				email: action.email,
				displayName: action.displayName,
				photoURL: action.photoURL,
				uid: action.uid,
				profile_uid: action.profile_uid,
				providerId: action.providerId
			}
			break;
		case 'LOGGEDOUT':
			state = {
				...state,
				email: null,
				displayName: null,
				photoURL: null,
				uid: null,
				profile_uid: null,
				providerId: null
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default MyReducer;


Copy actions/MyAction.js


import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


export const loggedIn = (params) => {
	localStorage.setItem('uid', params.uid);
	return {
		type: 'LOGGEDIN',
		email: params.email,
		displayName: params.displayName,
		photoURL: params.photoURL,
		uid: params.uid,
		profile_uid: params.uid,
		providerId: params.providerId
	};
};

export const loggedOut = () => {
	localStorage.removeItem('uid');
	return {
		type: 'LOGGEDOUT'	
	};	
};

export const getUsersObj = () => {
	const obj = localStorage.getItem('usersObject');
	if (!obj) {
		return null;	
	}
	const usersObj = JSON.parse(obj);
	return usersObj
};

export const actionGoogleLogin = () => {
	return {
		type: 'GOOGLELOGIN',
		payload: new Promise((resolve, reject) => {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebaseApp.auth().signInWithPopup(provider).then(function(result) {
				var obj = {};
				obj.email = result.user.email;
				obj.displayName = result.user.displayName;
				obj.photoURL = result.user.photoURL;
				obj.uid = result.user.uid;
				obj.profile_uid = result.user.providerData[0].uid;
				obj.providerId = result.user.providerData[0].providerId;
				obj.loggedIn = firebase.database.ServerValue.TIMESTAMP;
				var url = FirebaseConstant.basePath + '/users/' + obj.uid;
				
				firebaseDatabase.ref(url).once('value').then((snapshot) => {
					if (!snapshot.exists()) {
						obj.createdDate = firebase.database.ServerValue.TIMESTAMP;	 
					}
					
					firebaseDatabase.ref(url).update(obj);
					resolve(obj);
				});
			}).catch(function(error) {
				reject(error);
			});
		})
	};	
	
};


export const actionSignOut = () => {
	return {
		type: 'MAIN_SIGNOUT',
		payload: new Promise((resolve, reject) => {
			firebaseApp.auth().signOut().then(function() {
				resolve({});						   
			});
		})
	};	
};






Copy following in index.js
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';

import store from './store.js';
import {firebaseApp} from './MyFirebase.js';
import {loggedIn, loggedOut} from './actions/MyAction.js';
import App from './App.js';

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
		<App />
	</Provider>
),document.getElementById('root'));
registerServiceWorker();

Add following in App.js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
	  	hello world
      </div>
    );
  }
}

export default App;







