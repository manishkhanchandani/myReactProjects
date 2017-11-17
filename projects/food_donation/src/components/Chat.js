import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import {chatToUserId, toUserIdDetails} from '../actions/MyAction.js';


class Chat extends Component {
	
	sendMessage(e) {
		e.preventDefault();
		
		console.log('message sent');
	}
	
	getToUserIdDetails(toUserId)
	{
		this.props.callChangeUserId(toUserId);
		this.props.callToUserIdDetails(toUserId);
	}
	
	componentDidMount() {
		var toUserId = (this.props.match.params.toUserId) ? this.props.match.params.toUserId : null;	
		this.getToUserIdDetails(toUserId);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>All Users List</h3>
						
						<div className="row">
							<div className="col-md-4 chatUserPadding">
								<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Amitabhbachchan28529.jpg/225px-Amitabhbachchan28529.jpg" alt="..." className="img-responsive img-thumbnail" />
							</div>
							<div className="col-md-8 chatUserPadding">
								<b>Amitabh</b>
							</div>
						</div>
						
						<div className="row">
							<div className="col-md-4 chatUserPadding">
								<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Amitabhbachchan28529.jpg/225px-Amitabhbachchan28529.jpg" alt="..." className="img-responsive img-thumbnail" />
							</div>
							<div className="col-md-8 chatUserPadding">
								<b>Amitabh</b>
							</div>
						</div>
						
						<div className="row">
							<div className="col-md-4 chatUserPadding">
								<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Amitabhbachchan28529.jpg/225px-Amitabhbachchan28529.jpg" alt="..." className="img-responsive img-thumbnail" />
							</div>
							<div className="col-md-8 chatUserPadding">
								<b>Amitabh</b>
							</div>
						</div>
					</div>
					<div className="col-md-9">
						<h3>Chatting With {this.props.myReducer.toUserIdDetails.displayName}</h3>
						
						<form onSubmit={this.sendMessage.bind(this)} >
						  <div className="form-group">
							<input type="text" className="form-control" placeholder="Enter Message" />
						  </div>
							
						  <button type="submit" className="btn btn-primary form-control">Send Message</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer	
	};	
};


const mapDispatchToProps = (dispatch) => {
	return {
		callChangeUserId: (uid) => {
			dispatch(chatToUserId(uid));	
		},
		callToUserIdDetails: (uid) => {
			dispatch(toUserIdDetails(uid));	
		}
		
		
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);