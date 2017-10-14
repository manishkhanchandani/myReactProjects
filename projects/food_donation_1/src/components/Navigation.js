import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


class Navigation extends Component {
	
	googleAuth(e) {
		e.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();
		firebaseApp.auth().signInWithPopup(provider).then(function(result) {
			var obj = {};
			obj.name = result.user.displayName;
			obj.email = result.user.email;
			obj.image = result.user.photoURL;
			obj.uid = result.user.uid;
			obj.provider_uid = result.user.providerData[0].uid;
			obj.loggedIn = firebase.database.ServerValue.TIMESTAMP;
			var url = FirebaseConstant.basePath + '/users/' + obj.uid;
			
			firebaseDatabase.ref(url).once('value').then((snapshot) => {
				if (!snapshot.exists()) {
					obj.createdDate = firebase.database.ServerValue.TIMESTAMP;
				}
				firebaseDatabase.ref(url).update(obj);
			});
		});

	}
	
	signOut(e) {
		e.preventDefault();
		firebaseApp.auth().signOut().then(function() {
												   
		});
	}
	
	render() {
		console.log('props are: ', this.props);
		var strLoggedIn = [];
		var leftBox = [];
		var rightBox = [];
		
		if (this.props.uReducer.data.uid) {
			strLoggedIn.push(<li key="3" className="myName">{this.props.uReducer.data.name}</li>);
			strLoggedIn.push(<li key="1"><a href="" onClick={this.signOut.bind(this)}>Sign Out</a></li>);
			leftBox.push(<li key="1"><Link to="/create">Create</Link></li>);
			leftBox.push(<li key="2"><Link to="/myaccount">My Account</Link></li>);
			rightBox.push(<li key="1"><Link to="/messages">Messages</Link></li>);
		} else {
			strLoggedIn.push(<li key="2"><a href="" onClick={this.googleAuth.bind(this)}>Google Login</a></li>);
		}
		
		return (
                    <nav className="navbar navbar-inverse navbar-static-top">
                        <div className="container">
                          <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                              <span className="sr-only">Toggle navigation</span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">Project name</Link>
                          </div>
                          <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                              <li className="active"><Link to="/">Home</Link></li>
							  {leftBox}
                              <li className="dropdown">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                  {strLoggedIn}
                                </ul>
                              </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
							  {rightBox}
                            </ul>
                          </div>
                        </div>
                      </nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		uReducer: state.UserReducer
	};
};

export default connect(mapStateToProps)(Navigation);