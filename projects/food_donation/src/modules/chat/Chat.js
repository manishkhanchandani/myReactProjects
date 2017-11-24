import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeUserId, changeUserDetails} from './ChatAction.js';

import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {dynamicSort} from '../../utilities/functions.js';

import ChatUsers from './ChatUsers.js';
import Messages from './Messages.js';

class Chat extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			message: '',
			chat_users: null
		};
	}
	
	getChatUsers() {
		
		var userObjStr = localStorage.getItem('userObj');
		var userObj = JSON.parse(userObjStr);
		var uid = userObj.uid;
		
		var url = FirebaseConstant.basePath + '/chat/chatUsers';
		var ref = firebaseDatabase.ref(url).child(uid);//uid is person who is logged in
		
		ref.on('value', (snapshot) => {
			var chatUsers = [];
			var result = snapshot.val();
			if (!result) {
				return;	
			}
			
			for (let key in result) {
				chatUsers.push(result[key]);
			}
			chatUsers.sort(dynamicSort('-updated_dt'));
			
			this.setState({chat_users: chatUsers});
		});
	}
	
	sendMessage() {
		
	}
	
	getUserDetails(toUserId) {
		if (!toUserId) {
			return null;	
		}
		this.props.callChangeUserId(toUserId);
		this.props.callChangeUserDetails(toUserId);
	}
	
	componentDidMount() {
		this.getChatUsers();

		var toUserId = (this.props.match.params.toUserId) ? this.props.match.params.toUserId : null;
		this.getUserDetails(toUserId);
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<ChatUsers chat_users={this.state.chat_users} {...this.props} />
					</div>
					<div className="col-md-9">
							<div><h3>Chatting With {this.props.chatReducer.toUserDetails ? this.props.chatReducer.toUserDetails.displayName : ''}</h3>
							
							<form onSubmit={this.sendMessage.bind(this)} >
							  <div className="form-group">
								<input type="text" className="form-control" placeholder="Enter Message" value={this.state.message} onChange={(e) => {this.setState({message: e.target.value})}} />
							  </div>
								
							  <button type="submit" className="btn btn-primary form-control">Send Message</button>
							</form>
							
							<Messages />
							
							
							</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		chatReducer: state.ChatReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callChangeUserId: (newUserId) => {
			dispatch(changeUserId(newUserId));
		},
		callChangeUserDetails: (toUserId) => {
			dispatch(changeUserDetails(toUserId));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);