import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Results extends Component {
	render() {
		
		var distance = '';
		if (this.props.record.distance) {
distance = (<span> (<strong>{this.props.record.distance} mi.</strong>)</span>);
		}
			var myLink = null;

			if (this.props.fromUid && this.props.fromUid !== this.props.record.user_id) {
			
			myLink = '/chat/' + this.props.record.user_id;
			
			}
		
		return (
			<div className="col-md-6">
          <div className="media">
  			<div className="media-left">
			<a href="">		
			  <img className="media-object myImage" src={this.props.record.imageUrl} alt="..." />		
			</a>	
			  </div>
			    <div className="media-body">
			<h4 className="media-heading">{this.props.record.title}</h4>	
			<p>{this.props.record.description}</p>
			<p>{this.props.record.location.formatted_address}
			 {distance}
			</p>
						{
				
				myLink &&		
				<p><Link to={myLink}>Chat</Link></p>
				
				}
			
			
			  </div>
			</div>
			</div>
		);
	}
}

export default Results;// JavaScript Document