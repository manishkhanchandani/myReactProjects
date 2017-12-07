import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../../MyFirebase.js';
import './DetailUser.css';

class Detail extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: null,
			userDetails: null
		};
	}
	
	componentDidMount() {
		console.log('i am in component did mount: ', this.props);
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
		console.log('state is ', this.state);
		
		let loadingIcon = 'https://loading.io/spinners/gears/lg.dual-gear-loading-icon.gif';
		if (!this.state.data || !this.state.userDetails) {
			return (<img src={loadingIcon} alt="loading icon" />);	
		}
		var image = 'http://howmadareyou.com/wp-content/themes/MAD/images/default_profile_image.png';
		if (this.state.data.imageUrl) {
			image = this.state.data.imageUrl;	
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<img src={image} alt={this.state.data.title} className="img-responsive" />
					</div>
					<div className="col-md-5">
						<h1>{this.state.data.title}</h1>
					</div>
					<div className="col-md-3">
						
						
						
						<div className="container">
							<div className="row">
								<div className="col-lg-3 col-sm-6">
						
									<div className="card hovercard">
										<div className="cardheader">
						
										</div>
										<div className="avatar">
											<img alt="" src={this.state.userDetails.photoURL} />
										</div>
										<div className="info">
											<div className="title">
												<a target="_blank" href="http://scripteden.com/">Script Eden</a>
											</div>
											<div className="desc">Passionate designer</div>
											<div className="desc">Curious developer</div>
											<div className="desc">Tech geek</div>
										</div>
										<div className="bottom">
											<a className="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac">
												<i className="fa fa-twitter"></i>
											</a>
											<a className="btn btn-danger btn-sm" rel="publisher"
											   href="https://plus.google.com/+ahmshahnuralam">
												<i className="fa fa-google-plus"></i>
											</a>
											<a className="btn btn-primary btn-sm" rel="publisher"
											   href="https://plus.google.com/shahnuralam">
												<i className="fa fa-facebook"></i>
											</a>
											<a className="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam">
												<i className="fa fa-behance"></i>
											</a>
										</div>
									</div>
						
								</div>
						
							</div>
						</div>
						
						
						
						
						
						
					</div>
				</div>
			</div>
		);
	}
}

export default Detail;