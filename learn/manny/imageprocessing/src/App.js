import React, { Component } from 'react';
import {connect} from 'react-redux';
import Nav from './Nav.js';
import * as myActions from './MyAction.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import Upload from './Upload.js';
import Request from './Request.js';
import Monitor from './Monitor.js';


class App extends Component {


  render() {
    return (
	  <Router>
		  <div>
			<Nav />
			<Route exact={true} path="/" component={Upload} />
			<Route exact={true} path="/request" component={Request} />
			<Route exact={true} path="/monitor" component={Monitor} />
		  </div>
	  </Router>
    );
  }
}


const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callExample: (obj) => {
			dispatch(myActions.example(obj));
		},
		callChangeTab: (tab) => {
			dispatch(myActions.changeTab(tab));
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
