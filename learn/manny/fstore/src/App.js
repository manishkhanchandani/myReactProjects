import React, { Component } from 'react';
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, firebaseFireStore} from './MyFirebase.js';
import FirebaseConstant from './constants/FirebaseConstant.js';

class App extends Component {
	googleAuth(e) {
		e.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();
		firebaseApp.auth().signInWithPopup(provider).then(function(result) {
			var obj = {};
			obj.name = result.user.displayName;
			obj.email = result.user.email;
			obj.image = result.user.photoURL;
			//obj.refreshToken = result.user.refreshToken;
			obj.uid = result.user.uid;
			obj.provider_uid = result.user.providerData[0].uid;
			obj.loggedIn = firebase.database.ServerValue.TIMESTAMP;
			console.log('obj is ', obj);
			firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + obj.uid).set(obj);
			//firestore
			/*firebaseFireStore.collection("users").add(obj)
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});*/
		});

	}
	
	signOut(e) {
		e.preventDefault();
		firebaseApp.auth().signOut().then(function() {
		});
	}
	
  render() {
    return (
      <div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Our Web Application</h1>
					</div>
					<div className="col-md-12">
						<a href="" onClick={this.googleAuth.bind(this)}>Google</a><br /><br /><br /><a href="" onClick={this.signOut.bind(this)}>Sign Out</a>
					</div>
				</div>
			</div>
    );
  }
}

export default App;
