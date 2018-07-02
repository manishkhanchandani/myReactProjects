/*** src/index.js   ***/
import React, {Component} from 'react';
import './style.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import GoogleSignInBtn from './GoogleSignInBtn.js';

class AuthHome extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			firebaseApp: null,
			FirebaseConstant: null,
			firebaseDatabase: null
		}
		this.firebaseApp = null;
		this.FirebaseConstant = null;
		this.firebaseDatabase = null;
	}
	
	componentDidMount() {
		if (!this.props.config) return;
		if (!this.props.FirebaseConstant) return;
		const FirebaseConstant = this.props.FirebaseConstant;
		const config = this.props.config;
		this.firebaseApp = this.props.firebaseApp;
		this.FirebaseConstant = FirebaseConstant;
		this.firebaseDatabase = firebase.database();
		this.setState({firebaseApp: this.firebaseApp, FirebaseConstant: this.FirebaseConstant, firebaseDatabase: this.firebaseDatabase});
	}
	
	actionGoogleLogin(e) {
		e.preventDefault();
		return this.FirebaseLogin('GOOGLELOGIN');	
	}
	
	FirebaseLogin(type, additionalParams=null) {
		var provider = new firebase.auth.GoogleAuthProvider();
		switch (type) {
			case 'GOOGLELOGIN':
				provider = new firebase.auth.GoogleAuthProvider();
				provider.addScope('profile');
				provider.addScope('email');
				break;
			case 'FACEBOOKLOGIN':
				provider = new firebase.auth.FacebookAuthProvider();
				break;
			case 'TWITTERLOGIN':
				provider = new firebase.auth.TwitterAuthProvider();
				break;
			case 'GITHUBLOGIN':
				provider = new firebase.auth.GithubAuthProvider();
				break;
			case 'EMAILLOGIN':
				provider = new firebase.auth.GoogleAuthProvider();
				break;
			default:
				break;
		}
		
		return {
			type: type,
			payload: new Promise((resolve, reject) => {
				this.firebaseApp.auth().signInWithPopup(provider).then((result) => {
					var obj = {};
					obj.email = result.user.providerData[0].email;
					obj.displayName = result.user.providerData[0].displayName;
					obj.photoURL = result.user.providerData[0].photoURL;
					obj.uid = result.user.uid;
					obj.profile_uid = result.user.providerData[0].uid;
					obj.providerId = result.user.providerData[0].providerId;
					obj.loggedIn = firebase.database.ServerValue.TIMESTAMP;
					var url = this.FirebaseConstant.basePath + '/users/' + obj.uid;
					
					this.firebaseDatabase.ref(url).once('value').then((snapshot) => {
						if (!snapshot.exists()) {
							obj.createdDate = firebase.database.ServerValue.TIMESTAMP;
							obj.access_level = 'member';
						}
						
						this.firebaseDatabase.ref(url).update(obj);
						localStorage.setItem('mk-fb-user', JSON.stringify(snapshot.val()));
						window.location.reload();
						resolve(obj);
					});
				}).catch(function(error) {
					reject(error);
				});
			})
		};	
	}

	render() {
		if (!this.firebaseDatabase) return null;
		if (!this.firebaseApp) return null;
		if (!this.FirebaseConstant) return null;
		
		let obj = localStorage.getItem('mk-fb-user');
		let userObj = JSON.parse(obj);
		if (userObj) {
			return null;	
		}

		return (
			<div className="home">
				<div className="container">
					<div className="container text-center">
						<form className="form-signin">
							<h2 className="form-signin-heading">California Baby Bar Sign-in</h2>
				
							<small className="text-muted">Connect CalBabyBar.com with your favorite social network</small>
							<br /><br />
							<a className="btn btn-primary social-login-btn social-google" href="" onClick={this.actionGoogleLogin.bind(this)}><GoogleSignInBtn /></a>
						</form>
					</div>
			</div>
		</div>
		);
	}
}

export default AuthHome;