import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getUID} from '../auth/AuthAction.js';

class UserQuizCategories extends Component {

	constructor(props) {
		super(props);	
		
		this.state = {
			category: '',
			categories: null,
			error: null,
			category_id: null,
			subcategory: '',
			category_id_add: null,
			subcategory_id_add: null,
			question: '',
			answerOptions: ['', '', '', ''],
			correct: '',
			explanation: ''
		};
	}
	
	componentDidMount() {
		this.getCategories();	
	}
	
	
	getCategories() {
		let uid = getUID();
		let url = FirebaseConstant.basePath + '/userQuiz/' + uid + '/categories';
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({categories: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				records[k]._id = k;
				if (records[k].subcategories) {
					let subcat = [];
					for (let j in records[k].subcategories) {
						records[k].subcategories[j]._id = j;
						subcat.push(records[k].subcategories[j]);
					}
					records[k].subcat = subcat;
				}
				myArray.push(records[k]);
			}

			this.setState({categories: myArray});
		});
	}
	
	
	submitToFirebase(e) {
		e.preventDefault();
		let uid = getUID();
		var obj = {};
		obj.category = this.state.category;
		var url = FirebaseConstant.basePath + '/userQuiz/' + uid + '/categories';
		firebaseDatabase.ref(url).push(obj);
		this.setState({category: ''});
		this.getCategories();
	}
	
	submitSubCatToFirebase(e) {
		e.preventDefault();
		if (!this.state.subcategory) {
			return;	
		}
		
		let uid = getUID();
		var obj = {};
		obj.subcategory = this.state.subcategory;
		var url = FirebaseConstant.basePath + '/userQuiz/' + uid + '/categories/' + this.state.category_id + '/subcategories';
		firebaseDatabase.ref(url).push(obj);
		this.setState({subcategory: ''});
		this.getCategories();
	}

	render() {
		console.log("state is ", this.state);
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
					<div className="panel panel-primary">
						<div className="panel-heading">Categories</div>
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
											Delete
										</th>
									</tr>
									{
										this.state.categories.map((value, key) => {
											
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
														<div>
															<hr />
															{
																value.subcat.map((value2, key2) => {
																	return <div key={key2}>
																			{value2.subcategory}
																	</div>					 
																})
															}
														</div>
													}
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

export default UserQuizCategories;