import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'; 
import {connect} from 'react-redux';
import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Routes from './components/Routes.js';
import Main from './components/Main.js';


class App extends Component {
	
  render() {
	  const uid = localStorage.getItem('uid');
	  let content = [];
	  if (!this.props.myReducer.uid && !uid) {
	  	content.push(<Home key="3" />);
	  } else {
		content.push(<Nav key="1" />);
		content.push(<Routes key="2" />);
	  }
    return (
	  <Router>
		  <div>
		  	{content}
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


export default connect(mapStateToProps)(App);
