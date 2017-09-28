import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from '../MyFirebase.js';


class Login extends Component {
	
	googleAuth(e) {
		e.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();
		firebaseApp.auth().signInWithPopup(provider).then(function(result) {
			var obj = {};
			obj.name = result.user.displayName;
			obj.email = result.user.email;
			obj.image = result.user.photoURL;
			obj.refreshToken = result.user.refreshToken;
			obj.uid = result.user.uid;
			obj.provider_uid = result.user.providerData[0].uid;
			
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
						<h1>Login To Our Web Application</h1>
					</div>
					<div className="col-md-12">
						<a href="">Facebook</a><br /><a href="" onClick={this.googleAuth.bind(this)}>Google</a><br /><a href="">Twitter</a><br /><a href="">Github</a><br /><a href="" onClick={this.signOut.bind(this)}>Sign Out</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;