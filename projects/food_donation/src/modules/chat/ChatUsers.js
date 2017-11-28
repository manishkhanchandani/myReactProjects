import React, {Component} from 'react';
import {Badge} from 'react-bootstrap';
import {timeAgo} from '../../utilities/functions.js';

class ChatUsers extends Component {
	
	changeUser(toUid, e) {
		e.preventDefault();

		var oldUid = this.props.chatReducer.toUserId;
		this.props.displayChatMessage(toUid, oldUid);

		var url = '/chat/' + toUid;
		this.props.history.push(url);
		this.props.callChangeUserId(toUid);
		this.props.callChangeUserDetails(toUid);
	}

	render() {
		console.log('pppp: ', this.props);
		return (
			<div>
				<h3>All Users List</h3>
				
				{
					this.props.chat_users && this.props.chat_users.map((value, key) => {
						var strTime = timeAgo(value.updated_dt);
						return 		<div className="row" key={key}>
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