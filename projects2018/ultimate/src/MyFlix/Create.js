import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {getUserObj, getUID} from '../utilities/functions.js';

class Create extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			list: '',
			data: null,
			error: null
		};
	}
	
	componentDidMount() {
		this.getData();
	}

	getData() {
		let url = FirebaseConstant.basePath + '/list';
		let ref = firebaseDatabase.ref(url).orderByChild('user_id').equalTo(getUID());
		ref.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({data: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				console.log('record is ', records[k]);
				records[k]._id = k;
				myArray.push(records[k]);
			}

			this.setState({data: myArray});
		});
	}

	submitToFirebase(e) {
		e.preventDefault();
		let userObj = getUserObj();
		console.log(userObj);
		var obj = {};
		obj.list = this.state.list;
		obj.created = firebase.database.ServerValue.TIMESTAMP;
		obj.user_id = userObj.uid;
		obj.displayName = userObj.displayName;
		obj.photoURL = userObj.photoURL;
		var url = FirebaseConstant.basePath + '/list';
		firebaseDatabase.ref(url).push(obj);
		this.setState({list: ''});
		this.getData();
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.submitToFirebase.bind(this)}>
					<div className="form-group">
						<label>List Name</label>
						<input type="text" className="form-control" placeholder="Enter List Name" value={this.state.list} onChange={(e) => {
							this.setState({list: e.target.value});	
						}} />
						<br />
						<button type="submit" className="btn btn-primary form-control">Create New List</button>
					</div>
				</form>
				
				{
					this.state.data && 
					<div className="panel panel-danger">
						<div className="panel-heading">My List</div>
						<div className="panel-body">
							
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<th>
											List Name
										</th>
										<th>
											Add Categories & Videos
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
													{value.list}
												</td>
												<td>
													Add Categories & Videos
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
		);
	}
}

export default Create;