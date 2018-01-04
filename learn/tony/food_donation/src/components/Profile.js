import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

class Profile extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			displayName: '',
			age: '',
			gender: '',
			favFood: ''
		};
	}
	
	formSubmit(e) {
		e.preventDefault();
		var uid = localStorage.getItem('userId');
		if (!uid) {
			this.props.history.push("/");
			return;
		}
		
		var obj = this.state;
		var url = FirebaseConstant.basePath + '/users/'+uid;
		firebaseDatabase.ref(url).update(obj);
	}
	
	componentDidMount() {
		var uid = localStorage.getItem('userId');
		if (!uid) {
			this.props.history.push("/");
			return;
		}
		
		var url = FirebaseConstant.basePath + '/users/'+uid;
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			var record = snapshot.val();
			this.setState({
				email: record.email || '',
				displayName: record.displayName || '',
				age: record.age || '',
				gender: record.gender || '',
				favFood: record.favFood || '',		  
			});
		});
	}
	
	render() {
		return (
			<div className="container">
				<form className="form-horizontal" onSubmit={this.formSubmit.bind(this)}>
					<fieldset>
					
					<legend>Profile</legend>
					
					<div className="form-group">
					  <label className="col-md-4 control-label" htmlFor="email">Email</label>  
					  <div className="col-md-4">
					  <input id="email" name="email" type="text" placeholder="Enter Email" className="form-control input-md" required value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} />
						
					  </div>
					</div>
					
					<div className="form-group">
					  <label className="col-md-4 control-label" htmlFor="displayName">Display Name</label>  
					  <div className="col-md-4">
					  <input id="displayName" name="displayName" type="text" placeholder="Enter Display Name" className="form-control input-md" required value={this.state.displayName} onChange={(e) => {this.setState({displayName: e.target.value})}} />
						
					  </div>
					</div>
					
					<div className="form-group">
					  <label className="col-md-4 control-label" htmlFor="gender">Gender</label>
					  <div className="col-md-4">
					  <div className="radio">
						<label htmlFor="gender-0">
						  <input type="radio" name="gender" id="gender-0" value="Male" onClick={(e) => {this.setState({gender: e.target.value})}}  />
						  Male
						</label>
						</div>
					  <div className="radio">
						<label htmlFor="gender-1">
						  <input type="radio" name="gender" id="gender-1" value="Female" onClick={(e) => {this.setState({gender: e.target.value})}}  />
						  Female
						</label>
						</div>
					  </div>
					</div>
					
					<div className="form-group">
					  <label className="col-md-4 control-label" htmlFor="age">Age</label>  
					  <div className="col-md-4">
					  <input id="age" name="age" type="text" placeholder="Enter Age" className="form-control input-md" value={this.state.age} onChange={(e) => {this.setState({age: e.target.value})}} />
						
					  </div>
					</div>
					<div className="form-group">
					  <label className="col-md-4 control-label" htmlFor="favFood">Favorite Food</label>  
					  <div className="col-md-4">
						<input id="favFood" name="favFood" type="text" placeholder="Enter Your Favorite Food" className="form-control input-md" value={this.state.favFood} onChange={(e) => {this.setState({favFood: e.target.value})}} />
						
					  </div>
					</div>
					
					<div className="form-group">
					  <label className="col-md-4 control-label" htmlFor="submit"></label>
					  <div className="col-md-4">
						<button id="submit" name="submit" className="btn btn-primary">Update Profile</button>
					  </div>
					</div>
					
					</fieldset>
				</form>
			</div>

		);
	}
}

export default Profile;