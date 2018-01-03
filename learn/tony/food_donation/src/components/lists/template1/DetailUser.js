import React, {Component} from 'react';
import './DetailUser.css';

class DetailUser extends Component {
	render() {
		let myLink = '/chat/' + this.props.userDetails.uid;
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-sm-6">
			
						<div className="card hovercard">
							<div className="cardheader">
			
							</div>
							<div className="avatar">
								<img alt="" src={this.props.userDetails.photoURL} />
							</div>
							<div className="info">
								<div className="title">
									<a target="_blank" href={myLink}>{this.props.userDetails.displayName}</a>
								</div>
								<br />
								<br />
								<br />
							</div>
						</div>
			
					</div>
			
				</div>
			</div>
		);
	}
}

export default DetailUser;