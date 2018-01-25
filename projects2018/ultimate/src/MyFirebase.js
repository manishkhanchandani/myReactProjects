import * as firebase from 'firebase';
import {config} from './common/config.js';

var configFb = {
    apiKey: "AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk",
	authDomain: "project100-fe20e.firebaseapp.com",
	databaseURL: "https://project100-fe20e.firebaseio.com",
	projectId: "project100-fe20e",
	storageBucket: "project100-fe20e.appspot.com",
	messagingSenderId: "674827815611"
  };


//FirebaseConstant.configFb.apiKey
export const FirebaseConstant = {
	basePath: config.firebasePathName[config.site],
	configFb: configFb
};

export const firebaseApp = firebase.initializeApp(configFb);

export const firebaseDatabase = firebase.database();
