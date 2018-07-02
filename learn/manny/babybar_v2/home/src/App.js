import React, { Component } from 'react';
import Header from 'mkhancha-bbheader';
import AuthHome from 'mkhancha-fbauth';
import {FirebaseConstant, config, firebaseApp} from './MyFirebase.js'; 

class App extends Component {
  render() {
	  let userObj = localStorage.getItem('mk-fb-user');
	  console.log('userObj: ', userObj);
	  if (!userObj) {
		return (<AuthHome FirebaseConstant={FirebaseConstant} config={config} firebaseApp={firebaseApp}  /> );
	  }
    return (
      <div>
	  	<Header FirebaseConstant={FirebaseConstant} config={config} firebaseApp={firebaseApp} path={1} />
        <p>
          hello world
        </p>
      </div>
    );
  }
}

export default App;