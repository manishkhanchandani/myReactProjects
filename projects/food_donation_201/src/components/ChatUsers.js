import React, {Component} from 'react';
import {connect} from 'react-redux';
import {displayChatMessage} from '../actions/FoodDonationAction.js';
import {chatToUserId, toUserIdDetails} from '../actions/MyAction.js';

class ChatUsers extends Component {
	changeUser(toUid, e) {
		e.preventDefault();
		var url = `/chat/${toUid}`;
		this.props.history.push(url);
		this.props.callChangeUserId(toUid);
		this.props.callToUserIdDetails(toUid);
		var oldUid = this.props.myReducer.toUserId;
		this.props.callToDisplayChatMessage(toUid, oldUid);	
	}
	
	render() {
		return (
			<div>
				<h3>All Users List</h3>
				{
					this.props.chat_users && this.props.chat_users.map((value, key) => {
						return 		<div className="row" key={key}>
								<div className="col-md-4 chatUserPadding">
									<a href="" onClick={this.changeUser.bind(this, value.id)}><img src={value.image} alt={value.display_name} className="img-responsive img-thumbnail" /></a>
								</div>
								<div className="col-md-8 chatUserPadding">
									<a href="" onClick={this.changeUser.bind(this, value.id)}><b>{value.display_name}</b></a>
								</div>
							</div>				   
					})
				}
				
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer,	
		foodReducer: state.FoodDonationReducer	
	};	
};


const mapDispatchToProps = (dispatch) => {
	return {
		callChangeUserId: (uid) => {
			dispatch(chatToUserId(uid));	
		},
		callToUserIdDetails: (uid) => {
			dispatch(toUserIdDetails(uid));	
		},
		callToDisplayChatMessage: (toUid, oldUid) => {
			displayChatMessage(toUid, dispatch, oldUid);	
		}
		
		
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatUsers);