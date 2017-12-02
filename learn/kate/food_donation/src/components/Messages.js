import React, {Component} from 'react';
import './Messages.css';
import {timeAgo} from '../utilities/functions.js';

class Messages extends Component {
	render() {
		if (!this.props.records) {
			return null;	
		}
		return (
			<div className="messages">
				{
					this.props.records.map((value, key) => {
						var img = '';
						var name = '';
						var darkerClass = 'container_chat';
						var timeLocation = 'time-right';
						img = value.from_image;
						name = value.from_display_name;
						if (value.receiver) {
							darkerClass = 'container_chat darker';
							timeLocation = 'time-left';
						}
						var strTime = timeAgo(value.message_date);
						return (<div key={key} className={darkerClass}>
						  <img src={img} alt={name} title={name} />
						  <div className="pull-right name">{name}</div>
						  <p>{value.message}</p>
						  <span className={timeLocation}>{strTime}</span>
						  
						</div>)					
					})	
				}
			</div>
		);
	}
}

export default Messages;// JavaScript Document