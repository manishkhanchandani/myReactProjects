import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import NavMulti from './nav-multi/NavMulti.js';

import Home from './Home.js'
import './style.css';

import {ipDetails} from './CategoryListAction.js';

class CategoryList extends Component {
	
	componentDidMount() {
		this.props.callIpDetails();
	}
	
	render() {
		return (
			<Router>
			<div>
				<NavMulti />
				<Switch>
				<Route exact={true} path="/" component={Home} />
				</Switch>
			</div>
			</Router>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		categoryListReducer: state.CategoryListReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callIpDetails: () => {
			dispatch(ipDetails());
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);