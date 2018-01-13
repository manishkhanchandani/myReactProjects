import React, {Component} from 'react';

import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

import {getUID, getUsersObj} from '../auth/AuthAction.js';

class AdminQuizNewCategory extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			name: '',
			error: null
		};
	}
	
	submitToFirebase(e) {
		e.preventDefault();
		let userObj = getUsersObj();
		console.log(userObj);
		var obj = {};
		obj.name = this.state.name;
		obj.created = firebase.database.ServerValue.TIMESTAMP;
		//obj.user_id = userObj.uid;
		//obj.displayName = userObj.displayName;
		//obj.photoURL = userObj.photoURL;
		obj.isAdmin = true;
		var url = FirebaseConstant.basePath + '/customQuiz/categories';
		firebaseDatabase.ref(url).push(obj);
		this.setState({name: ''});
	}
	
	render() {
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">Create New Category</div>
				<div className="panel-body">
					
					<form onSubmit={this.submitToFirebase.bind(this)}>
						<div className="form-group">
							<label>Category Name</label>
							<input type="text" className="form-control" placeholder="Enter Category Name" value={this.state.name} onChange={(e) => {
								this.setState({name: e.target.value});	
							}} />
							<br />
							<button type="submit" className="btn btn-primary form-control">Create New Category</button>
						</div>
					</form>
				</div>
				<div className="panel-footer"></div>
			</div>
		);
	}
}


class AdminQuizNewSubCategory extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			name: '',
			error: null
		};
	}
	
	submitToFirebase(e) {
		e.preventDefault();
		let userObj = getUsersObj();
		console.log(userObj);
		var obj = {};
		obj.name = this.state.name;
		obj.created = firebase.database.ServerValue.TIMESTAMP;
		obj.category = this.props.category;
		obj.category_id = this.props.category_id;
		//obj.user_id = userObj.uid;
		//obj.displayName = userObj.displayName;
		//obj.photoURL = userObj.photoURL;
		obj.isAdmin = true;
		var url = FirebaseConstant.basePath + '/customQuiz/sub_categories';
		firebaseDatabase.ref(url).push(obj);
		this.setState({name: ''});
	}
	
	render() {
		return (
			<form onSubmit={this.submitToFirebase.bind(this)}>
				<div className="row">
					<div className="col-md-8">
						<input type="text" className="form-control" placeholder="Enter Sub Category Name" value={this.state.name} onChange={(e) => {
						this.setState({name: e.target.value});	
					}} />
					</div>
					<div className="col-md-4">
						<button type="submit" className="btn btn-primary form-control">Add Sub Category</button>
					</div>
				</div>
			</form>
		);
	}
}

class AdminQuizViewCategory extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			data: null,
			error: null,
			openSubCat: null
		};
	}
	
	componentDidMount() {
		this.viewCategories();
	}

	viewCategories() {
		let url = FirebaseConstant.basePath + '/customQuiz/categories';
		let ref = firebaseDatabase.ref(url);
		ref.off();
		ref.on('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({data: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				records[k]._id = k;
				myArray.push(records[k]);
			}

			this.setState({data: myArray});		   
		});
	}
	render() {
		console.log('hey: ', this.state);
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">View All Categories</div>
				<div className="panel-body">
					{
						this.state.data && 
						<div className="panel panel-danger">
							<div className="panel-body">
								
								<div className="table-responsive">
									<table className="table table-striped">
										<tbody>
										<tr>
											<th>
												Category Name
											</th>
											<th>
												Add SubCategory
											</th>
											<th>
												Edit
											</th>
											<th>
												Delete
											</th>
										</tr>
										{
											this.state.data.map((value, key) => {
												return <tr key={key}>
													<td>
														{value.name}
													</td>
													<td>
														<a href="" onClick={(e) => {e.preventDefault(); this.setState({openSubCat: value})}}>Add SubCategory</a>
													</td>
													<td>
														Edit
													</td>
													<td>
														Delete
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
				<div className="panel-footer"></div>
			</div>
		);
	}
}


class AdminQuizCreate extends Component {
	render() {
		return (
			<div>
				<h3>Admin Quiz</h3>
				
				<AdminQuizNewCategory />
				<AdminQuizViewCategory />
			</div>
		);
	}
}

export default AdminQuizCreate;