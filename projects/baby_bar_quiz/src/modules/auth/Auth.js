import React, {Component} from 'react';
import {connect} from 'react-redux';

import {firebaseApp} from '../../MyFirebase.js';
import {loggedIn, loggedOut, getUID} from './AuthAction.js';

class App extends Component {

	
	render() {
		const uid = getUID();
		return (
			<div>
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authReducer: state.AuthReducer
	}
};


export default connect(mapStateToProps)(App);