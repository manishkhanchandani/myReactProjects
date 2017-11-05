import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    //HashRouter,
    Route,
    Switch,
	BrowserRouter as Router
} from 'react-router-dom';

import App from 'containers/App/App.jsx';
import Home from './authenticate/Home.js';

class Main extends Component {
	render() {
		const uid = localStorage.getItem('uid');
		var content = null;
		if (!this.props.myReducer.uid && !uid) {
			content = (<Home />);
		} else {
			content = (<Switch>
					<Route path="/" name="Home" component={App}/>
				</Switch>);
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


export default connect(mapStateToProps)(Main);