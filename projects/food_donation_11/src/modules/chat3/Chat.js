import React, {Component} from 'react';

import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {dynamicSort} from '../../utilities/functions.js';

import ChatUsers from './ChatUsers.js';
import Messages from './Messages.js';
import './Chat.css';

class Chat extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			message: '',
			chat_users: null,
			toUserDetails: null,
			toUserId: null,
			uid: null,
			records: null
		};
	}
	
	changeUserId(newUserId){
		this.setState({toUserId: newUserId});
	};

	changeUserDetails(toUserId){
		var url = FirebaseConstant.basePath + '/users/' + toUserId;
					
		firebaseDatabase.ref(url).once('value').then((snapshot) => {
			if (!snapshot.exists()) {
				//do something, TODO LIST, may be give some error	 
			}
	
			this.setState({toUserDetails: snapshot.val()});
		});
	};

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
		this.changeUserId(toUserId);
		this.changeUserDetails(toUserId);
	}
	
	componentDidMount() {
		this.getChatUsers();

		var toUserId = (this.props.match.params.toUserId) ? this.props.match.params.toUserId : null;
		this.getUserDetails(toUserId);
		this.displayChatMessage(toUserId);
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
		firebaseDatabase.ref(url).child(userObj.uid).child(this.state.toUserId).push(obj);

		var url2 = FirebaseConstant.basePath + '/chat/chatUsers';
		var fobj = {
			display_name: this.state.toUserDetails.displayName,
			image: this.state.toUserDetails.photoURL,
			updated_dt: firebase.database.ServerValue.TIMESTAMP,
			id: this.state.toUserId,
			cnt: null
		};
		firebaseDatabase.ref(url2).child(userObj.uid).child(this.state.toUserId).set(fobj);
		
		var obj2 = {
			message: this.state.message,
			message_date: firebase.database.ServerValue.TIMESTAMP,
			display_name: userObj.displayName,
			image: userObj.photoURL,
			read: false,
			receiver: true,
			sender: false
		};
		firebaseDatabase.ref(url).child(this.state.toUserId).child(userObj.uid).push(obj2);
		var tobj = {
			display_name: userObj.displayName,
			image: userObj.photoURL,
			updated_dt: firebase.database.ServerValue.TIMESTAMP,
			id: userObj.uid
		};
		var toRef = firebaseDatabase.ref(url2).child(this.state.toUserId).child(userObj.uid);
		
		//count
		var databaseRef = toRef.child('cnt');
		databaseRef.once('value', (snapshot) => {
			var cnt = snapshot.val();
			
			if (!cnt) cnt = 0;
			cnt++;
			tobj.cnt = cnt;
			toRef.set(tobj);
		});
		//count ends
		this.setState({message: ''});
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
			console.log('removing link');
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
						<ChatUsers chat_users={this.state.chat_users} {...this.props} changeUserId={this.changeUserId.bind(this)} changeUserDetails={this.changeUserDetails.bind(this)} displayChatMessage={this.displayChatMessage.bind(this)} toUserId={this.state.toUserId} />
					</div>
					<div className="col-md-9">
							<div><h3>Chatting With {this.state.toUserDetails ? this.state.toUserDetails.displayName : ''}</h3>
							
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


export default Chat;