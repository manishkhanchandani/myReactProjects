import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom'; 
import {getUID} from './components/auth/AuthAction.js';
import NavMulti from './components/NavMulti.js';
import Home from './components/Home.js';
import Main from './components/Main.js';

class App extends Component {
  render() {
		const uid = getUID();
		if (!uid) {
			return (<div><NavMulti /><Home /></div>);
		}

		return (
			<div>
				<NavMulti />
				<Switch>
				  <Route exact path="/" component={Main}/>
				  
				</Switch>
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
