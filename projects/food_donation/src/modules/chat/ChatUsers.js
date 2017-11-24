import React, {Component} from 'react';

class ChatUsers extends Component {
	
	changeUser(toUid, e) {
		e.preventDefault();
		var url = '/chat/' + toUid;
		this.props.history.push(url);
		this.props.callChangeUserId(toUid);
		this.props.callChangeUserDetails(toUid);
		//few more lines
	}

	render() {
		return (
			<div>
				<h3>All Users List</h3>
				
				{
					this.props.chat_users && this.props.chat_users.map((value, key) => {
						return 		<div className="row" key={key}>
								<div className="col-md-4 chatUserPadding">
									<img src={value.image} alt={value.display_name} className="img-responsive img-thumbnail" />
								</div>
								<div className="col-md-8 chatUserPadding">
									<b><a href="" onClick={this.changeUser.bind(this, value.id)}>{value.display_name}</a></b>
								</div>
							</div>				   
					})
				}
				
			</div>
		);
	}
}



export default ChatUsers;