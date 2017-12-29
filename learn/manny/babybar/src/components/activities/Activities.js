import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {timeAgo, processRecords} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';
import './Activities.css';
import {Link} from 'react-router-dom';
import {getUID} from '../auth/AuthAction.js';

class Activities extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: null, 
			pageNumber: 1
		};
	}

	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	componentDidMount() {
		let url = FirebaseConstant.basePath + '/activities';
		let ref = firebaseDatabase.ref(url).limitToLast(500);
		ref.off();
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result) {
				this.setState({data: null});
				return;
			}
			var myArray = [];
			for (var key in result) {
				var obj = result[key];
				obj.dt = timeAgo(obj.created_dt);
				myArray.push(obj);
			}
			
			this.setState({data: myArray});
		});
	}

	render() {
		if (!this.state.data) {
			return null;	
		}
		const {myArrayConverted, paginationProps} = processRecords(this.state.data, '-created_dt', null, [], 10, this.state.pageNumber, this.onActivePageChange.bind(this), 1);
		const uid = getUID();
		return (
			<div className="panel panel-primary activities">
				<div className="panel-heading">Activities</div>
				<div className="panel-body">
				{
					myArrayConverted.map((value, key) => {
						let url = '/chat/' + value.uid;
						return <small key={key} className="media">
						  <img className="d-flex mr-3 pull-right" src={value.photoURL} alt={value.displayName} />
						  <div className="media-body">
							<h5 className="mt-0">
								{
									uid !== value.uid &&
									<Link to={url}>{value.displayName}</Link>
								}
								{
									uid === value.uid &&
									<span>{value.displayName}</span>
								}
								
								</h5>
							<div><Link to={value.url}>{value.page}</Link></div>
							<div>{value.dt}</div>
						  </div>
						  <hr />
						</small>					  
					})
				}
				<hr />
				<Paginator {...paginationProps} />
				</div>
			</div>
		);
	}
}

export default Activities;