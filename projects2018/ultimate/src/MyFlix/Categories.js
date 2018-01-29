import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {Link} from 'react-router-dom';

class Categories extends Component {

	constructor(props) {
		super(props);	
		
		this.state = {
			category: '',
			categories: null,
			error: null,
			category_id: null,
			subcategory: ''
		};
	}
	
	componentDidMount() {
		this.getCategories();	
	}
	
	
	getCategories() {
		let url = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/categories';
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({categories: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				let obj = records[k];
				obj._id = k;
				if (obj.subcategories) {
					obj.subcat = [];
					for (let j in obj.subcategories) {
						let subObject = obj.subcategories[j];
						subObject._id = j;
						obj.subcat.push(subObject);
					}
					
				}
				myArray.push(obj);
			}

			this.setState({categories: myArray});
		});
	}
	
	
	submitToFirebase(e) {
		e.preventDefault();
		
		var obj = {};
		obj.category = this.state.category;
		
		var url = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/categories';
		firebaseDatabase.ref(url).push(obj);
		this.setState({category: ''});
		this.getCategories();
		
		var url2 = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/updated';
		firebaseDatabase.ref(url2).set(firebase.database.ServerValue.TIMESTAMP);
	}
	
	submitSubCatToFirebase(e) {
		e.preventDefault();
        
		if (!this.state.subcategory) {
			return;	
		}
		
		var obj = {};
		obj.subcategory = this.state.subcategory;
		var url = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/categories/' + this.state.category_id + '/subcategories';
		firebaseDatabase.ref(url).push(obj);
		this.setState({subcategory: ''});
		this.getCategories();
		
		var url2 = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/updated';
		firebaseDatabase.ref(url2).set(firebase.database.ServerValue.TIMESTAMP);
	}

	render() {
		console.log('state is ', this.state);
		let videoUrl = '/manage/' + this.props.match.params.list + '/videos';
		return (
			<div className="container">
				<h3>Categories</h3>
				<form onSubmit={this.submitToFirebase.bind(this)}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter Category Name" value={this.state.category} onChange={(e) => {
							this.setState({category: e.target.value});	
						}} />
						<br />
						<button type="submit" className="btn btn-primary form-control">Create New Category</button>
					</div>
				</form>
				
				{
					this.state.categories && 
					<div className="panel panel-danger">
						<div className="panel-heading">Categories<Link to={videoUrl} className="pull-right">Add Videos</Link></div>
						<div className="panel-body">
							
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<th>
											Category Name
										</th>
										<th>
											Add SubCategories
										</th>
										<th>
											Edit
										</th>
										<th>
											Delete
										</th>
									</tr>
									{
										this.state.categories.map((value, key) => {
																   console.log('value is ', value);
											return <tr key={key}>
												<td>
													{value.category}
												</td>
												<td>
													<a href="" onClick={(e) => {e.preventDefault(); this.setState({category_id: value._id, subcategory: ''})}}>Add Subcategories</a>
													
													{
														value._id === this.state.category_id &&
														<form onSubmit={this.submitSubCatToFirebase.bind(this)}>
															<div className="form-group">
																<br />
																<input type="text" className="form-control" placeholder="Enter Sub Category Name" value={this.state.subcategory} onChange={(e) => {
																	this.setState({subcategory: e.target.value});	
																}} />
																<br />
																<button type="submit" className="btn btn-primary form-control">Create Sub Category</button>
															</div>
														</form>
													}
													
													{
														value.subcat && 
														<ul>
															{
																value.subcat.map((value2, key2) => {
																	return <li key={key2}>{value2.subcategory}</li>
																})	
															}
														</ul>
													}
													
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

export default Categories;