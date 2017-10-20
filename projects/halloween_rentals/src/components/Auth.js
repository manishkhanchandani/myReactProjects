import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
	render() {
		if (!this.props.myReducer.uid) {
			return <Redirect to="/" push={true} />
		}
		return (
			<div>
				Auth is here
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer	
	};
};

export default connect(mapStateToProps)(Auth);