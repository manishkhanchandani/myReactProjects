import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {loggedIn, getUsersObj} from '../auth/AuthAction.js';
class ChangeUser extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			category: '',
			users: null,
			error: null
		};
	}
	componentDidMount() {
		let userObj = getUsersObj();
		if (!(userObj.access_level === 'admin' || userObj.access_level === 'superadmin')) {
			window.location.href = '/';
			return;
		}
		this.getUser();	
	}
	
	banUser(uid, e) {
		e.preventDefault();
		let url = FirebaseConstant.basePath + '/users';
		firebaseDatabase.ref(url).child(uid).child('ban').set(1);
	}
	unBanUser(uid, e) {
		e.preventDefault();
		let url = FirebaseConstant.basePath + '/users';
		firebaseDatabase.ref(url).child(uid).child('ban').set(false);
	}
	
	getUser() {
		let url = FirebaseConstant.basePath + '/users';
		let ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({users: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				records[k]._id = k;
				myArray.push(records[k]);
			}

			this.setState({users: myArray});
		});
	}
	
	changeUser(details, e) {
		e.preventDefault();
		console.log('details: ', details);
		this.props.func1(details);
	}

	render() {
		let userObj = getUsersObj();
		if (!(userObj.access_level === 'admin' || userObj.access_level === 'superadmin')) {
			return null;
		}
		return (
			<div className="container changeUser">
				<h3>Users</h3>
				
				{
					this.state.users && 
					<div className="panel panel-danger">
						<div className="panel-heading">Users</div>
						<div className="panel-body">
							
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<th>
											Display Name
										</th>
										<th>
											Image
										</th>
										<th>
											Email
										</th>
										<th>
											Login
										</th>
									</tr>
									{
										this.state.users.map((value, key) => {
											let dt = new Date(value.createdDate);
											let dtString = dt.toString();
											let banString = value.ban ? 'Banned User' : '';
											return <tr key={key}>
												<td>
													{value.displayName}<br />
													{dtString}<br />
													{banString}
												</td>
												<td>
													<img className="img-responsive img-thumbnail" src={value.photoURL} alt="" />
												</td>
												<td>
													{value.email}
												</td>
												<td>
													<a href="" onClick={this.changeUser.bind(this, value)}>Login</a> | &nbsp;
													{
														value.ban && 
														<a href="" onClick={this.unBanUser.bind(this, value.uid)}>Un Ban User</a>
													}
													{
														!value.ban && 
														<a href="" onClick={this.banUser.bind(this, value.uid)}>Ban User</a>
													}
												</td>
											</tr>		 
										})
									}
									</tbody>
								</table>
							</div>
						</div>
					
					</div>
				}
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
		func1: (details) => {
			dispatch(loggedIn(details));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUser);