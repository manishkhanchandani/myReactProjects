import React, {Component} from 'react';
import './style.css';

class Results extends Component {
	render() {
		return (
			<div className="panel panel-default event">
			  <div className="panel-body">
				<div className="rsvp col-xs-2 col-sm-2">
				  <i>18</i>
				  <i>nov</i>
				  <div className="hidden-xs">
					<span className="fa fa-thumbs-up fa-2x"></span>
					<span className="fa fa-thumbs-down fa-2x"></span>
				  </div>
				</div>
				<div className="info col-xs-8 col-sm-7">
				  Event Title
				  <div className="visible-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elitero..</div>
				  <div className="hidden-xs">
					  <ul className="nav nav-tabs" role="tablist">
						<li role="presentation" className="active"><a href="#location" aria-controls="location" role="tab" data-toggle="tab">Location</a></li>
						<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
					  </ul>
					  <div className="tab-content">
						<div role="tabpanel" className="tab-pane active" id="location">Location</div>
						<div role="tabpanel" className="tab-pane" id="profile">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis feugiat sem, eu sagittis libero. Duis non odio ut nibh volutpat tempus eget interdum elit. 
						</div>
					  </div>
					</div>
				</div>
				<div className="author col-xs-2 col-sm-3">
					<div className="profile-image">
						<img src="http://api.randomuser.me/portraits/med/men/71.jpg"/>
					</div>
					<div className="profile hidden-xs">
						<strong>Robert White</strong>
						<article>Event leader and founder of this group</article>
						<div className="links hidden-sm">
						  <i className="fa fa-github-square fa-2x col-xs-3"></i>
						  <i className="fa fa-google-plus-square fa-2x col-xs-3"></i>
						  <i className="fa fa-facebook-square fa-2x col-xs-3"></i>
						  <i className="fa fa-linkedin-square  fa-2x col-xs-3"></i>
						</div>
					</div>
					
				</div>
			  </div>
			</div>
		);
	}
}

export default Results;