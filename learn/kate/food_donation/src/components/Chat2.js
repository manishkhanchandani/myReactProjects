import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import {chatToUserId, toUserIdDetails} from '../actions/MyAction.js'; 
import Messages from './Messages.js';
import ChatUsers from './ChatUsers.js';
import {dynamicSort} from '../utilities/functions.js';
class Chat2 extends Component {
	   		
			constructor(props) {
			super(props)
			
			this.state = {	
			message: '',
			records: null,
			chat_users:null
			
			};

}
	
	getChatUsers(uid) {
		var url = FirebaseConstant.basePath + '/chat/chatUsers';
		var ref = firebaseDatabase.ref(url).child(uid);//uid is person who is logged in
		
		ref.on('value', (snapshot) => {
			var chatUsers = [];
			var result = snapshot.val();
			if (!result) {
				return;	
			}
			console.log('chatUsers: ', snapshot.val());
			
			for (let key in result) {
				chatUsers.push(result[key]);
			}
			// sorting, filtering
			chatUsers.sort(dynamicSort('-updated_dt'));
			this.setState({chat_users: chatUsers});
		});
	}
	
	
	 displayChatMessage(fromUid, toUid) { 
	 
	  if (!toUid) {
			return false;	
		}
	 
		var url = FirebaseConstant.basePath + '/chat/messages';
		var ref = firebaseDatabase.ref(url).child(fromUid).child(toUid).limitToLast(5);
		
		var myArray = [];
		ref.on('value', (snapshot) => {
						 
			var result = snapshot.val();	
			for (var key in result) {				
				myArray.push(result);
			}
			
			//sorting	
			//filtering		
			//pagination
 			myArray.sort(dynamicSort('-message_date'));
			this.setState({records: myArray});
		});	
	}
	
	
	sendMessage(e) {
		e.preventDefault();

		var obj = {
			message: this.state.message,
			message_date: firebase.database.ServerValue.TIMESTAMP,
			display_name: this.props.myReducer.displayName,
			image: this.props.myReducer.photoURL,
			read: true,
			receiver: false,
			sender: true
		};
		var url = FirebaseConstant.basePath + '/chat/messages';
		firebaseDatabase.ref(url).child(this.props.myReducer.uid).child(this.props.myReducer.toUserId).push(obj);
		
		var url2 = FirebaseConstant.basePath + '/chat/chatUsers';
		
		var fobj = {
			display_name: this.props.myReducer.toUserIdDetails.displayName,
			image: this.props.myReducer.toUserIdDetails.photoURL,
			updated_dt: firebase.database.ServerValue.TIMESTAMP,
			id: this.props.myReducer.toUserId
		};
		firebaseDatabase.ref(url2).child(this.props.myReducer.uid).child(this.props.myReducer.toUserId).set(fobj);
		
		
		var obj2 = {
			message: this.state.message,
			message_date: firebase.database.ServerValue.TIMESTAMP,
		    display_name: this.props.myReducer.displayName,
			image: this.props.myReducer.photoURL,
			read: false,
			receiver: true,
			sender: false
		};
		firebaseDatabase.ref(url).child(this.props.myReducer.toUserId).child(this.props.myReducer.uid).push(obj2);
		
		
		var tobj = {
			display_name: this.props.myReducer.displayName,
			image: this.props.myReducer.photoURL,
			updated_dt: firebase.database.ServerValue.TIMESTAMP,
			id: this.props.myReducer.uid
		};
		firebaseDatabase.ref(url2).child(this.props.myReducer.toUserId).child(this.props.myReducer.uid).set(tobj);
		
		
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
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						
						 <ChatUsers chat_users={this.state.chat_users} />
						
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
							
							<Messages records={this.state.records}/>
							
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
		
		} ,//boundary ,
		callToUserIdDetails: (uid) => {
			dispatch(toUserIdDetails(uid));	
		}

};

};



export default connect(mapStateToProps, mapDispatchToProps) (Chat2);
