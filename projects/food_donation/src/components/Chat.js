import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import {chatToUserId, toUserIdDetails} from '../actions/MyAction.js';
import Messages from './Messages.js';

class Chat extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			message: '',
			records: null
		};
	}
	
	
	displayChatMessage(fromUid, toUid) {	

		if (!toUid) {
			return false;	
		}
		var url = FirebaseConstant.basePath + '/chat/messages';
		var ref = firebaseDatabase.ref(url).child(fromUid).child(toUid);
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			
			var myArray = [];
			for (var key in result) {				
				myArray.push(result[key]);
			}
			
			//sorting
			
			//filtering
			
			//pagination

			this.setState({records: myArray});
		});	
	}
	
	sendMessage(e) {
		e.preventDefault();

		var obj = {
			message: this.state.message,
			message_date: firebase.database.ServerValue.TIMESTAMP,
			from_display_name: this.props.myReducer.displayName,
			to_display_name: this.props.myReducer.toUserIdDetails.displayName,
			from_image: this.props.myReducer.photoURL,
			to_image: this.props.myReducer.toUserIdDetails.photoURL,
			read: true,
			receiver: false,
			sender: true
		};
		var url = FirebaseConstant.basePath + '/chat/messages';
		firebaseDatabase.ref(url).child(this.props.myReducer.uid).child(this.props.myReducer.toUserId).push(obj);
		
		var obj2 = {
			message: this.state.message,
			message_date: firebase.database.ServerValue.TIMESTAMP,
			from_display_name: this.props.myReducer.displayName,
			to_display_name: this.props.myReducer.toUserIdDetails.displayName,
			from_image: this.props.myReducer.photoURL,
			to_image: this.props.myReducer.toUserIdDetails.photoURL,
			read: false,
			receiver: true,
			sender: false
		};
		firebaseDatabase.ref(url).child(this.props.myReducer.toUserId).child(this.props.myReducer.uid).push(obj2);
		
		this.setState({message: ''});
	}
	
	getToUserIdDetails(toUserId)
	{
		this.props.callChangeUserId(toUserId);
		this.props.callToUserIdDetails(toUserId);
		
		var userObjStr = localStorage.getItem('userObj');
		var userObj = JSON.parse(userObjStr);
		this.displayChatMessage(userObj.uid, toUserId);
	}
	
	componentDidMount() {
		var toUserId = (this.props.match.params.toUserId) ? this.props.match.params.toUserId : null;	
		this.getToUserIdDetails(toUserId);
	}

	render() {
		console.log('state is ', this.state);
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
						{
							this.props.myReducer.toUserIdDetails
							?
							<div><h3>Chatting With {this.props.myReducer.toUserIdDetails.displayName}</h3>
							
							<form onSubmit={this.sendMessage.bind(this)} >
							  <div className="form-group">
								<input type="text" className="form-control" placeholder="Enter Message" value={this.state.message} onChange={(e) => {this.setState({message: e.target.value})}} />
							  </div>
								
							  <button type="submit" className="btn btn-primary form-control">Send Message</button>
							</form>
							
							<Messages records={this.state.records} />
							
							
							</div>
							:
							<div>Please choose user before sending message</div>
						}
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