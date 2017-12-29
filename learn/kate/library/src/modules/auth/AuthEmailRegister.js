import React, {Component} from 'react';
import {Button,Alert} from 'react-bootstrap';
class AuthEmailRegister extends Component {
	
	
	constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			password: '',
			cpassword: '',
			error:null
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
			console.log('frm: ', this.state);
		}
		
	
	render() {
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
					<div className="form-group">
					<label>Email address</label>
					<input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} />
					</div>
					<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} />
					</div>
					<div className="form-group">
					<label>Confirm Password</label>
					<input type="password" className="form-control" placeholder="Enter confirm password" value={this.state.cpassword} onChange={(e) => {this.setState({cpassword: e.target.value})}} />
					</div>
					<Button bsStyle="primary" className="form-control" type="submit">Submit</Button>
					</form>
					</div>
		);
	}
}

export default AuthEmailRegister;