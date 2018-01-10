import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {loggedIn} from '../auth/AuthAction.js';

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
		this.getUser();	
	}
	
	
	getUser() {
		let url = FirebaseConstant.basePath + '/users';
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
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
											return <tr key={key}>
												<td>
													{value.displayName}<br />
													{dtString}
												</td>
												<td>
													<img className="img-responsive img-thumbnail" src={value.photoURL} alt="" />
												</td>
												<td>
													{value.email}
												</td>
												<td>
													<a href="" onClick={this.changeUser.bind(this, value)}>Login</a>
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