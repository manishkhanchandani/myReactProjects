import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import NavMulti from './nav-multi/NavMulti.js';

import Home from './Home.js';
import CityManagerNew from './CityManager/New.js';
import CityManagerNew2 from './CityManager/UploadFile.js';
import './style.css';

import {ipDetails} from './CategoryListAction.js';

class CategoryList extends Component {
	
	componentDidMount() {
		this.props.callIpDetails();
	}
	
	render() {
		return (
			<Router>
			<div className="category-list">
				<NavMulti />
				<Switch>
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/citymanager/new" component={CityManagerNew} />
				<Route exact={true} path="/citymanager/new2" component={CityManagerNew2} />
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