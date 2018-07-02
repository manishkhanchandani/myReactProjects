import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Auth extends Component {

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
	
	actionGoogleLogin(e) {
		e.preventDefault();
		return this.FirebaseLogin('GOOGLELOGIN');	
	}
	actionFacebookLogin(e) {
		e.preventDefault();
		return this.FirebaseLogin('FACEBOOKLOGIN');	
	}
	actionTwitterLogin(e) {
		e.preventDefault();
		return this.FirebaseLogin('TWITTERLOGIN');	
	}
	actionGithubLogin(e) {
		e.preventDefault();
		return this.FirebaseLogin('GITHUBLOGIN');	
	}
	actionEmailLogin(e) {
		e.preventDefault();
		return this.FirebaseLogin('EMAILLOGIN');	
	}
	
	actionSignOut(e) {
		e.preventDefault();
		return {
			type: 'MAIN_SIGNOUT',
			payload: new Promise((resolve, reject) => {
				this.firebaseApp.auth().signOut().then(function() {
					localStorage.removeItem('mk-fb-user');
					window.location.reload();
					resolve({});						   
				});
			})
		};	
	}
	
	getUID() {
		let obj = localStorage.getItem('mk-fb-user');
		if (!obj) return null;
		let userObj = JSON.parse(obj);
		let uid = userObj.uid;
		return uid;
	}


	getUsersObj() {
		let obj = localStorage.getItem('mk-fb-user');
		if (!obj) {
			return null;	
		}
		let usersObj = JSON.parse(obj);
		return usersObj;
	}
	
	render() {
		if (!this.firebaseDatabase) return null;
		if (!this.firebaseApp) return null;
		if (!this.FirebaseConstant) return null;
		const uid = this.getUID();
		var showUser = [];
		let myStyle = {
			display: 'block',
			padding: '3px 20px',
			clear: 'both',
			fontWeight: 400,
			lineHeight: 1.42857143,
			color: '#333',
			whiteSpace: 'nowrap'
		};
		if (uid) {
			const userObj = this.getUsersObj();
			showUser.push(<li key="1" style={myStyle}>{userObj.displayName}</li>);
			showUser.push(<li key="2"><a href="" onClick={this.actionSignOut.bind(this)}>SignOut</a></li>);	
		} else {
			showUser.push(<li key="3"><a href="" onClick={this.actionGoogleLogin.bind(this)}>Google Login</a></li>);
		}
		return (
			<li className="dropdown">
			  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
			  <ul className="dropdown-menu">
				{showUser}
			  </ul>
			</li>
		);
	}
}

export default Auth;