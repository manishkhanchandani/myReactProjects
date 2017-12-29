import * as firebase from 'firebase';


 let fb_path = '';
if (process.env.NODE_ENV === 'development') {
	fb_path = '/food_donation';
} else {
	fb_path = '/food_donation_live';
}




// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8sgehIfsKjEdhOHyv1Jo1U8oCM52fHuw",
    authDomain: "food-donation2017.firebaseapp.com",
    databaseURL: "https://food-donation2017.firebaseio.com",
    projectId: "food-donation2017",
    storageBucket: "",
    messagingSenderId: "88850513684"
  };
  
  
  
  export const FirebaseConstant = {
    basePath: fb_path	
};
  
  export const firebaseApp = firebase.initializeApp(config);
  export const firebaseDatabase = firebase.database();