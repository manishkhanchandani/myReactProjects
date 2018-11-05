import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../../MyFirebase.js';
import DetailUser from './DetailUser.js';

import {Link} from 'react-router-dom'; 

import Comments from '../../../modules/Comments/Comments.js';

class Detail extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: null,
			userDetails: null
		};
	}
	
	componentDidMount() {
		var url = FirebaseConstant.basePath + '/data/posts/'+this.props.match.params.id;
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			let record = snapshot.val();
			this.setState({data: record});
			
			//query to user record
			let usersUrl = FirebaseConstant.basePath + '/users/'+record.user_id;
			var usersRef = firebaseDatabase.ref(usersUrl);
			usersRef.once('value', (userSnapshot) => {
				this.setState({userDetails: userSnapshot.val()});
			});
		});
	}
	render() {
		
		let loadingIcon = 'https://loading.io/spinners/gears/lg.dual-gear-loading-icon.gif';
		if (!this.state.data || !this.state.userDetails) {
			return (<img src={loadingIcon} alt="loading icon" />);	
		}
		var image = 'http://howmadareyou.com/wp-content/themes/MAD/images/default_profile_image.png';
		if (this.state.data.imageUrl) {
			image = this.state.data.imageUrl;	
		}
		
		var myDate = new Date(this.state.data.created_dt);
		var myDateStr = myDate.toString();
		
		var fromUid = localStorage.getItem('userId');
		var myLink = '/chat';
		if (fromUid && fromUid !== this.state.data.user_id) {
			myLink = '/chat/' + this.state.data.user_id;
		}
		
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-9">
						<h1>{this.state.data.title}</h1>
						<div className="row">
							<div className="col-md-6">
								<img src={image} alt={this.state.data.title} className="img-responsive" />
								<br /><br />
								<p><Link to={myLink} className="btn btn-primary form-control">Chat With Post Owner</Link></p>
								<Comments id={this.props.match.params.id} />
							</div>
							<div className="col-md-6">
								<p><b>ID: </b><br />{this.state.data.id}</p>
								<p><b>Description: </b><br />{this.state.data.description}</p>
								<p><b>Created On: </b><br />{myDateStr}</p>
								<p><b>Location: </b><br />{this.state.data.location.formatted_address}</p>
								<p><b>Tags: </b><br />{this.state.data.tags}</p>
								<p><b>Latitude: </b><br />{this.state.data.location.lat}</p>
								<p><b>Longitude: </b><br />{this.state.data.location.lng}</p>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						
						
						<DetailUser userDetails={this.state.userDetails}/>
						
						
						
						
						
						
						
					</div>
				</div>
			</div>
		);
	}
}

export default Detail;