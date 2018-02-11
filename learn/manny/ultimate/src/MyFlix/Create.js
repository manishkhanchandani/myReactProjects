import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {getUserObj, getUID} from '../utilities/functions.js';
import {Link} from 'react-router-dom'; 
import DeleteModal from '../common/DeleteModal.js';
import {defaultList} from './MyFlixAction.js';

class Create extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			list: '',
			data: null,
			error: null,
			deleteModal: false,
			deleteDetailRecord: null
		};
	}
	
	close() {
		this.setState({deleteModal: false, deleteDetailRecord: null});
	}
	
	deleteRecord(record) {
		var url = FirebaseConstant.basePath + '/list/' + record._id;
		firebaseDatabase.ref(url).set(null);
		this.close();
		this.getData();
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
		obj.updated = firebase.database.ServerValue.TIMESTAMP;
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
											Add Categories
										</th>
										<th>
											Add Videos
										</th>
										<th>
											Delete
										</th>
										<th>
											View List
										</th>
									</tr>
									{
										this.state.data.map((value, key) => {
											let linkUrl = '/manage/' + value._id + '/categories';
											let videoUrl = '/manage/' + value._id + '/videos';
											let viewListUrl = '/';
											if (defaultList !== value._id) {
												viewListUrl = '/' + value._id;
											}
											return <tr key={key}>
												<td>
													{value.list}
												</td>
												<td>
													<Link to={linkUrl}>Add Categories</Link>
												</td>
												<td>
													<Link to={videoUrl}>Add Videos</Link>
												</td>
												<td>
													<a href="" onClick={(e) => {e.preventDefault(); this.setState({deleteModal: true, deleteDetailRecord: value})}}>Delete This List</a>
												</td>
												<td>
													<Link to={viewListUrl}>View List</Link>
												</td>
											</tr>			 
										})
									}
									
									
									</tbody>
								</table>
								{
									this.state.deleteDetailRecord && 
									<DeleteModal message={`id: ${this.state.deleteDetailRecord._id}`} closeFn={this.close.bind(this)} deleteRecordFn={this.deleteRecord.bind(this)} deleteModal={this.state.deleteModal} details={this.state.deleteDetailRecord} />
								}
							</div>
						</div>
					
					</div>
				}
				
			</div>
		);
	}
}

export default Create;