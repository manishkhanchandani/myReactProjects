import React, { Component } from 'react';
import {connect} from 'react-redux';
import Nav from './Nav.js';
import * as myActions from './MyAction.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import Home from './Home.js';
import Upload from './Upload.js';
import Request from './Request.js';
import Monitor from './Monitor.js';
import Learn from './Learn.js';
import Search from './Search.js';


class App extends Component {


  render() {
    return (
	  <Router>
		  <div>
			<Nav />
			<Route exact={true} path="/" component={Home} />
			<Route exact={true} path="/learn" component={Learn} />
			<Route exact={true} path="/search" component={Search} />
			<Route exact={true} path="/upload" component={Upload} />
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
