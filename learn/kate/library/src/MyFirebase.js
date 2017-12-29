import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBXPeWUXqAZpj3ZoHM-VaBhm7D3aFTk0vk",
    authDomain: "lib-app-ddc5d.firebaseapp.com",
    databaseURL: "https://lib-app-ddc5d.firebaseio.com",
    projectId: "lib-app-ddc5d",
    storageBucket: "",
    messagingSenderId: "578215458545"
  };

export const FirebaseConstant = {
	basePath: '/library'
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();


