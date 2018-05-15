import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toastify/Toast.css';

import Nav from './Nav.js';
import * as myActions from './MyAction.js';
import Home from './Home.js';
import Upload from './Upload.js';
import Request from './Request.js';
import Monitor from './Monitor.js';
import Logs from './Logs.js';
import Learn from './Learn.js';
import Search from './Search.js';
import Toast from './Toastify/Toast.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment';

class App extends Component {


  render() {
	  let status = 0;
	  if (this.props.myReducer.learn === 'started') {
		status = 1;  
	  }
	  if (this.props.myReducer.search === 'started') {
		status = 2;  
	  }
    return (
	  <Router>
		  <div>
			<Nav />
		  	<div className="container-app">
				<div className=" mytable">
					<div className="col-md-2 left-column mycell">
						{
							status === 1 && 
							<div className="alexa-command">
								alexa started
							</div>
						}
						{
							status === 0 && 
							<div className="alexa-command">
								awaiting Alexa Command <span className="dotAnimate"><span>.</span><span>.</span><span>.</span></span> <span className="comments"><FontAwesomeIcon icon={faComment}/></span>
							</div>
						}
						{
							status === 2 && 
							<div className="alexa-command">
								search started
							</div>
						}
						<Logs />
					</div>
					<div className="col-md-8 center-column mycell"><Search /></div>
					<div className="col-md-2 right-column mycell">
						<Learn />
						<Monitor />
					</div>
				</div>
			</div>
			<ToastContainer />
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
