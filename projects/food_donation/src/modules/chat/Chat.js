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
			chat_users: null,
			records: null
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
	
	sendMessage(e) {
		e.preventDefault();

		var userObjStr = localStorage.getItem('userObj');
		var userObj = JSON.parse(userObjStr);

		var obj = {
			message: this.state.message,
			message_date: firebase.database.ServerValue.TIMESTAMP,
			display_name: userObj.displayName,
			image: userObj.photoURL,
			read: true,
			receiver: false,
			sender: true
		};
		var url = FirebaseConstant.basePath + '/chat/messages';
		firebaseDatabase.ref(url).child(userObj.uid).child(this.props.chatReducer.toUserId).push(obj);

		var url2 = FirebaseConstant.basePath + '/chat/chatUsers';
		var fobj = {
			display_name: this.props.chatReducer.toUserDetails.displayName,
			image: this.props.chatReducer.toUserDetails.photoURL,
			updated_dt: firebase.database.ServerValue.TIMESTAMP,
			id: this.props.chatReducer.toUserId
		};
		firebaseDatabase.ref(url2).child(userObj.uid).child(this.props.chatReducer.toUserId).set(fobj);
		
		var obj2 = {
			message: this.state.message,
			message_date: firebase.database.ServerValue.TIMESTAMP,
			display_name: userObj.displayName,
			image: userObj.photoURL,
			read: false,
			receiver: true,
			sender: false
		};
		firebaseDatabase.ref(url).child(this.props.chatReducer.toUserId).child(userObj.uid).push(obj2);
		var tobj = {
			display_name: userObj.displayName,
			image: userObj.photoURL,
			updated_dt: firebase.database.ServerValue.TIMESTAMP,
			id: userObj.uid
		};
		firebaseDatabase.ref(url2).child(this.props.chatReducer.toUserId).child(userObj.uid).set(tobj);
		this.setState({message: ''});
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
		
		this.displayChatMessage(toUserId);
	}
	
	displayChatMessage(toUid, oldUid=null) {	

		if (!toUid) {
			return false;	
		}
		
		var userObjStr = localStorage.getItem('userObj');
		var userObj = JSON.parse(userObjStr);
		var fromUid = userObj.uid;
		if (!fromUid) {
			return false;	
		}

		var url = FirebaseConstant.basePath + '/chat/messages';
		var ref = firebaseDatabase.ref(url).child(fromUid).child(toUid).limitToLast(500);
		
		if (oldUid) {
			//make ref off
			var refOld = firebaseDatabase.ref(url).child(fromUid).child(oldUid);
			refOld.off();
		}
		
		var myArray = [];
		ref.on('child_added', (snapshot) => {
			var result = snapshot.val();
			myArray.push(result);
			/*for (var key in result) {				
				myArray.push(result[key]);
			}*/
			
			//sorting
			myArray.sort(dynamicSort('-message_date'));
			
			//filtering
			
			//pagination

			this.setState({records: myArray});
		});
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<ChatUsers chat_users={this.state.chat_users} {...this.props} displayChatMessage={this.displayChatMessage.bind(this)} />
					</div>
					<div className="col-md-9">
							<div><h3>Chatting With {this.props.chatReducer.toUserDetails ? this.props.chatReducer.toUserDetails.displayName : ''}</h3>
							
							<form onSubmit={this.sendMessage.bind(this)} >
							  <div className="form-group">
								<input type="text" className="form-control" placeholder="Enter Message" value={this.state.message} onChange={(e) => {this.setState({message: e.target.value})}} />
							  </div>
								
							  <button type="submit" className="btn btn-primary form-control">Send Message</button>
							</form>
							
							<Messages records={this.state.records} />
							
							
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