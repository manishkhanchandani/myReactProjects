import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';

import App from './App';


import store from './store.js';

import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from './MyFirebase.js';//, firebaseFireStore
import FirebaseConstant from './constants/FirebaseConstant.js';

import {loginUser, logoutUser} from './actions/UserAction.js';

//firebase auth checking if user is logged in or not
firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    let userId = user.uid;
    firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId).once('value').then((snapshot) => {
																							 console.log('sn is ', snapshot.exists());
      if (!snapshot.exists()) {
        return;
      }

      //create
      let userData = snapshot.val();
	  console.log('ud is ', userData);
      firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId + '/loggedIn').set(firebase.database.ServerValue.TIMESTAMP);
      
		var obj = {};
		obj.name = user.displayName;
		obj.email = user.email;
		obj.image = user.photoURL;
		obj.refreshToken = user.refreshToken;
		obj.uid = user.uid;
		obj.provider_uid = user.providerData[0].uid;
		
		store.dispatch(loginUser(obj));
      firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId + '/loggedIn').onDisconnect().set(0);

    });
  } else {
		store.dispatch(logoutUser());
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
   </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
