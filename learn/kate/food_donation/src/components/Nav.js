import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from   '../MyFirebase.js';

class Nav extends Component {
	
		googleLogin(e) {

		e.preventDefault();
		
		var provider = new firebase.auth.GoogleAuthProvider();
	    firebaseApp.auth().signInWithPopup(provider).then(function(result) {  
		
		var obj = {};
		
		obj.email = result.user.email;
		
		obj.displayName = result.user.displayName;
		
		obj.photoURL = result.user.photoURL;
		
		obj.uid = result.user.uid;
		
		obj.profile_uid = result.user.providerData[0].uid;
		
		obj.providerId = result.user.providerData[0].providerId;
		
		console.log('obj: ', obj);
		
		});
		
		
		
		}

		
		signOut(e) {
		
		e.preventDefault();
		firebaseApp.auth().signOut().then(function(){
												   
												   console.log('signout');
												   });
	
			
		}
	
	render() {
		return (
<div>
<nav className="navbar navbar-inverse navbar-static-top">
			  <div className="container">
				<div className="navbar-header">
				  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				  </button>
				  <Link className="navbar-brand" to="/">Food Donation</Link>
				</div>
				<div id="navbar" className="navbar-collapse collapse">
				  <ul className="nav navbar-nav">
					<li className="active"><Link to="/">Home</Link></li>
					<li><Link to="/create">Create</Link></li>
					<li><a href="#contact">Contact</a></li>
					<li className="dropdown">
					  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
					  <ul className="dropdown-menu">
								<li><a href="" onClick={this.googleLogin.bind(this)}>Google Login</a></li>
								<li><a href="">Facebook Login</a></li>
								<li><a href="">Twitter Login</a></li>
								<li><a href="">GitHub Login</a></li>
								<li><a href="" onClick={this.signOut.bind(this)}>SignOut</a></li>
					  </ul>
					</li>
				  </ul>
				  <ul className="nav navbar-nav navbar-right">
					<li><a href="../navbar/">Default</a></li>
					<li className="active"><a href="./">Static top <span className="sr-only">(current)</span></a></li>
					<li><a href="../navbar-fixed-top/">Fixed top</a></li>
				  </ul>
				</div>
			  </div>
			</nav>
				
</div>
		);
	}
}

export default Nav;