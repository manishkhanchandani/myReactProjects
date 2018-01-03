import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './style.css';

class Results extends Component {
	render() {
		if (!this.props.record) {
			return null;	
		}
		var distance = '';
		if (this.props.record.distance) {
			distance = 	(<span> (<strong>{this.props.record.distance} mi.</strong>)</span>);
		}
		
		var myLink = null;
		if (this.props.fromUid && this.props.fromUid !== this.props.record.user_id) {
			myLink = '/chat/' + this.props.record.user_id;
		}
		return (
			<div className="row">
						<div className="col-md-12">
							<ul className="event-list">
								<li>
									<time datetime="2014-07-20">
										<span className="day">4</span>
										<span className="month">Jul</span>
										<span className="year">2014</span>
										<span className="time">ALL DAY</span>
									</time>
									<img alt="Independence Day" src={this.props.record.imageUrl} />
									<div className="info">
										<h2 className="title">{this.props.record.title}</h2>
										<p className="desc">{this.props.record.description}</p>
										<p className="desc">{this.props.record.location.formatted_address} </p>
									</div>
									<div className="social">
										<ul>
											<li className="facebook"><a href="#facebook"><span className="fa fa-facebook"></span></a></li>
											<li className="twitter"><a href="#twitter"><span className="fa fa-twitter"></span></a></li>
											<li className="google-plus"><a href="#google-plus"><span className="fa fa-google-plus"></span></a></li>
										</ul>
									</div>
								</li>
			
							</ul>
						</div>
					</div>
		);
	}
}

export default Results;