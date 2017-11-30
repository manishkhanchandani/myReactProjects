import React, {Component} from 'react';
import {Badge} from 'react-bootstrap';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {timeAgo} from '../../utilities/functions.js';

class ChatUsers extends Component {

	changeUser(toUid, e) {
		e.preventDefault();
		//few more lines
		var oldUid = this.props.toUserId;
		this.props.displayChatMessage(toUid, oldUid);
		var url = '/chat3/' + toUid;
		this.props.history.push(url);
		this.props.changeUserId(toUid);
		this.props.changeUserDetails(toUid);
		//update count
		var userObjStr = localStorage.getItem('userObj');
		var userObj = JSON.parse(userObjStr);
		var fromUid = userObj.uid;
		var url2 = FirebaseConstant.basePath + '/chat/chatUsers';
		firebaseDatabase.ref(url2).child(fromUid).child(toUid).child('cnt').set(null);
		//update count
	}

	render() {
		console.log('ppp', this.props);
		return (
			<div>
				<h3>All Users List</h3>

				{
					this.props.chat_users && this.props.chat_users.map((value, key) => {
						var myClass = "row";
						if (value.id === this.props.toUserId) {
							myClass = myClass + ' active';
						}
						var strTime = timeAgo(value.updated_dt);
						return 		<div className={myClass} key={key}>
								<div className="col-md-4 chatUserPadding">
									<img src={value.image} alt={value.display_name} className="img-responsive img-thumbnail" />
								</div>
								<div className="col-md-8 chatUserPadding">
									<b><a href="" onClick={this.changeUser.bind(this, value.id)}>{value.display_name}</a></b>
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
