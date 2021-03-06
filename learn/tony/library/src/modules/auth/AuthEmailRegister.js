import React, {Component} from 'react';
import {Button, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';

import {actionEmailRegister} from './AuthAction.js';
import {Redirect} from 'react-router-dom';

class AuthEmailRegister extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			password: '',
			cpassword: '',
			displayName: '',
			photoUrl: '',
			error: null
		};
	}
	
	submitFrm(e) {
		e.preventDefault();
		this.setState({error: null});
		if (!this.state.email) {
			this.setState({error: 'Please fill email.'});
			return;
		} 
		if (!this.state.password) {
			this.setState({error: 'Please fill password.'});
			return;
		}
		if (!this.state.cpassword) {
			this.setState({error: 'Please fill confirm password.'});
			return;
		}
		if (this.state.password !== this.state.cpassword) {
			this.setState({error: 'Password does not match with confirm password.'});
			return;
		}
		if (!this.state.displayName) {
			this.setState({error: 'Please fill display name.'});
			return;
		} 
		if (!this.state.photoUrl) {
			this.setState({error: 'Please fill photo / image url.'});
			return;
		} 
		this.props.f_email(this.state.email, this.state.password, this.state.displayName, this.state.photoUrl);
	}

	render() {
		
		if (this.props.authReducer.processCompleted) {
			return <Redirect to="/" push={true} />;
		}

		return (
			<div className="container">
				<form onSubmit={this.submitFrm.bind(this)}>
					<h3 className="text-center">User Registration</h3>
					{
						this.state.error && 
						<Alert bsStyle="warning">
							{this.state.error}
						</Alert>
					}
					{
						this.props.authReducer.error && 
						<Alert bsStyle="warning">
							{this.props.authReducer.error}
						</Alert>
					}
					
					 <div className="form-group">
						  <label>Email address *</label>
						  <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} />
					  </div>
					<div className="form-group">
						<label>Password *</label>
						<input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>Confirm Password *</label>
						<input type="password" className="form-control" placeholder="Enter confirm password" value={this.state.cpassword} onChange={(e) => {this.setState({cpassword: e.target.value})}} />
					</div>
					 <div className="form-group">
						  <label>Display Name *</label>
						  <input type="text" className="form-control" placeholder="Enter display name" value={this.state.displayName} onChange={(e) => {this.setState({displayName: e.target.value})}} />
					  </div>
					 <div className="form-group">
						  <label>Photo URL *</label>
						  <input type="text" className="form-control" placeholder="Enter your photo / image url" value={this.state.photoUrl} onChange={(e) => {this.setState({photoUrl: e.target.value})}} />
					  </div>
					<Button bsStyle="primary" className="form-control" type="submit">Submit</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authReducer: state.AuthReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		f_email: (email, password, displayName, photoUrl) => {
			dispatch(actionEmailRegister(email, password, displayName, photoUrl));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthEmailRegister);