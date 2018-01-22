import * as firebase from 'firebase';
import {config} from './common/config.js';

  var configFb = {
    apiKey: "AIzaSyBXPeWUXqAZpj3ZoHM-VaBhm7D3aFTk0vk",
    authDomain: "lib-app-ddc5d.firebaseapp.com",
    databaseURL: "https://lib-app-ddc5d.firebaseio.com",
    projectId: "lib-app-ddc5d",
    storageBucket: "lib-app-ddc5d.appspot.com",
    messagingSenderId: "578215458545"
  };

//FirebaseConstant.configFb.apiKey
export const FirebaseConstant = {
	basePath: config.firebasePathName[config.site],
	configFb: configFb,
	defaultListId:'-L2XAE8LJZdLY3PVKLKJ'
};

export const firebaseApp = firebase.initializeApp(configFb);

export const firebaseDatabase = firebase.database();





