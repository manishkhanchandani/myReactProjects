import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';

class Monitor extends Component {
	componentDidMount() {	
		this.props.callChangeTab('monitor');
	}

	render() {
		return (
			<div className="my-container fade-in">
				<img className="img-responsive" src="/img/scr_monitor.png" alt="upload" />
			</div>
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
		callChangeTab: (tab) => {
			dispatch(myActions.changeTab(tab));
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);