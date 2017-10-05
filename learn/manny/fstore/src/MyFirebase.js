import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
   apiKey: "AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk",
   authDomain: "project100-fe20e.firebaseapp.com",
   databaseURL: "https://project100-fe20e.firebaseio.com",
   projectId: "project100-fe20e",
   storageBucket: "project100-fe20e.appspot.com",
   messagingSenderId: "674827815611"

}

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();

export const firebaseFireStore = firebase.firestore();


