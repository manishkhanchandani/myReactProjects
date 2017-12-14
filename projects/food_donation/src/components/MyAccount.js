import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import ResultContainer from './ResultContainer.js';

class MyAccount extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			myAccountData: null	
		};
	}
	
	componentDidMount() {
		var uid = localStorage.getItem('userId');
		if (!uid) {
			this.props.history.push("/");	
		}
		this.getDataFromFirebase(uid);
	}
	
	getDataFromFirebase(uid) {	
		var url = FirebaseConstant.basePath + '/data/posts';
		var ref = firebaseDatabase.ref(url).orderByChild('user_id').equalTo(uid);
		ref.off();
		ref.on('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({myAccountData: null});
				return;
			}
			this.setState({myAccountData: snapshot.val()});
		});
	}
	
	
	render() {
		const myData = this.state.myAccountData;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h3>Results</h3>

						<ResultContainer data={myData} />

					</div>
				</div>
			</div>
		);
	}
}

export default MyAccount;