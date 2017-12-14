import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import './Comments.css';
import {timeAgo, processRecords} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';

class Comments extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			comment: '',
			data: null,
			filterTerm: '',
			pageNumber: 1
		};
	}
	
	componentDidMount()
	{
		var url = FirebaseConstant.basePath + '/comments/'+this.props.id;
		var ref = firebaseDatabase.ref(url).limitToLast(500);
		ref.on('value', (snapshot) => {
			var records = snapshot.val();
			
			if (!records) {
				this.setState({data: null});
				return false;
			}
			
			var myArray = [];
			for (var key in records) {
				var obj = records[key];
				obj.id = key;
				obj.dt = timeAgo(obj.created_dt);
				myArray.push(obj);
			}
						
			console.log('myArray: ', myArray);
			this.setState({data: myArray});
		});
	}
	
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	submitComments() {
		console.log('form submitted');
		var simpleObj = localStorage.getItem('simpleObj');
		var userObj = JSON.parse(simpleObj);
		console.log('userObj: ', userObj);
		var obj = {
			uid: userObj.uid,
			name: userObj.name,
			image: userObj.image,
			message: this.state.comment,
			created_dt: firebase.database.ServerValue.TIMESTAMP
		};
		var url = FirebaseConstant.basePath + '/comments/'+this.props.id;
		var unique_id = firebaseDatabase.ref(url).push(obj).key;
		this.setState({comment: ''});
	}
	
	
	render() {
		console.log('props are ', this.props);
		console.log('state are ', this.state);
		
		if (this.state.data) {
			var {myArrayConverted, paginationProps} = processRecords(this.state.data, '-created_dt', this.state.filterTerm, ['message'], 5, this.state.pageNumber, this.onActivePageChange.bind(this));
		}

		return (
			<div className="comments">
				<div className="row">
					<div className="col-md-12">
						<h3>Comments</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<textarea type="text" className="form-control" rows="3" value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}}></textarea><br />
					</div>
					<div className="col-md-12">
						<button type="submit" className="btn btn-primary form-control" onClick={this.submitComments.bind(this)}>Submit</button><br /><br />
					</div>
					
				</div>
				<div className="row">
					<div className="col-md-12">
						
						
						{
							this.state.data &&
							myArrayConverted.map((value, key) => {
								return <div key={key} className="media">
									<div className="media-left">
										<a href=""><img alt={value.name} className="media-object" src={value.image} /> </a> 
									</div> 
									<div className="media-body"> 
										<p>{value.message}</p>
										<div><small>{value.dt}</small></div>
										<div><small>By {value.name}</small></div>
									</div> 
								</div>			 
							})
						}
							
						
						
						<Paginator {...paginationProps} />
						
						
					</div>
				</div>
			</div>
		);
	}
}

export default Comments;