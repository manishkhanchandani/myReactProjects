import React, {Component} from 'react';
import {Badge} from 'react-bootstrap';
import {timeAgo} from '../../utilities/functions.js';
import './Chat.css';

import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';


class ChatUsers extends Component {
	
	changeUser(toUid, e) {
		e.preventDefault();

		var oldUid = this.props.chatReducer.toUserId;
		this.props.displayChatMessage(toUid, oldUid);

		var url = '/chat/' + toUid;
		this.props.history.push(url);
		this.props.callChangeUserId(toUid);
		this.props.callChangeUserDetails(toUid);
		
		//code to remove the bubble
		var fromUid = localStorage.getItem('userId');
		var url2 = FirebaseConstant.basePath + '/chat/chatUsers';
		firebaseDatabase.ref(url2).child(fromUid).child(toUid).child('cnt').set(null);
		
	}

	render() {
		return (
			<div>
				<h3>All Users List</h3>
				
				{
					this.props.chat_users && this.props.chat_users.map((value, key) => {
						var strTime = timeAgo(value.updated_dt);
						var d = new Date(value.updated_dt);
						var myDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
						let myClass = "row";
						if (value.id === this.props.chatReducer.toUserId) {
							myClass = myClass + ' active';	
						}
						return 		<div className={myClass} key={key}>
								<div className="col-md-4 chatUserPadding">
									<img src={value.image} alt={value.display_name} className="img-responsive img-thumbnail" />
								</div>
								<div className="col-md-8 chatUserPadding">
									<b><a href="" onClick={this.changeUser.bind(this, value.id)}>{value.display_name}</a> </b>
									{
										value.cnt && 
											<Badge>
												{value.cnt}
											</Badge>
									}
									<br />
									<div>{strTime}</div>
								</div>
							</div>				   
					})
				}
				
			</div>
		);
	}
}



export default ChatUsers;