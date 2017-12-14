import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './style.css';
import {firebaseDatabase, FirebaseConstant} from '../../../MyFirebase.js';

class Results extends Component {
	
	deleteRecord(rec, e)
	{
		e.preventDefault();
		var user_id = localStorage.getItem('userId');
		if (user_id !== rec.user_id) {
			return false;	
		}
		console.log('rec is ', rec);

		var url = FirebaseConstant.basePath + '/data';
		var postUrl = url + '/posts/' + rec.id;
		firebaseDatabase.ref(postUrl).set(null);
		
		var country = rec.location.country;
		var state = rec.location.administrative_area_level_1;
		var county = rec.location.administrative_area_level_2;
		var city = rec.location.locality;
		
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/country').child(country).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/state').child(country).child(state).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/county').child(country).child(state).child(county).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/city').child(country).child(state).child(county).child(city).child(rec.id).set(null);
		firebaseDatabase.ref(FirebaseConstant.basePath + '/data/users').child(user_id).child(rec.id).set(null);
		
		var tags = rec.tags.split(',');
		
		if (tags.length > 0) {
			for (var i = 0; i < tags.length; i++) {
				var tag = tags[i].trim();
				
				var tagURL = FirebaseConstant.basePath + '/data/tags/' + tag;
				firebaseDatabase.ref(tagURL + '/country').child(country).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/state').child(country).child(state).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/county').child(country).child(state).child(county).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/city').child(country).child(state).child(county).child(city).child(rec.id).set(null);
				firebaseDatabase.ref(tagURL + '/all_tag_posts').child(rec.id).set(null);
			}
		}
	}

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
		
		var image = 'http://howmadareyou.com/wp-content/themes/MAD/images/default_profile_image.png';
		if (this.props.record.imageUrl) {
			image = this.props.record.imageUrl;	
		}
		
		var myDate = new Date(this.props.record.created_dt);
		var myDateStr = myDate.toString();
		
		var detailLink = '/detail/'+this.props.record.id;
		
		var deleteLink = false;
		var editLink = '';
		if (this.props.fromUid && this.props.fromUid === this.props.record.user_id) {
			editLink = '/edit/'+this.props.record.id;
			deleteLink = true;
		}
		
		return (
			<div className="col-md-12">
				<div className="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing">
                        <div className="media">
                            <a className="pull-left" href="#" target="_parent">
                            <img alt="image" className="img-responsive" src={image} /></a>

                            <div className="clearfix visible-sm"></div>

                            <div className="media-body fnt-smaller">
                                <a href="#" target="_parent"></a>

                                <h4 className="media-heading">
                                  <Link to={detailLink}>{this.props.record.title} <small className="pull-right">{this.props.record.location.formatted_address} {distance}</small></Link></h4>


                                <ul className="list-inline mrg-0 btm-mrg-10 clr-535353">
                                    {
										myLink &&
										<li><Link to={myLink}>Chat</Link></li>
									}
									
									{
										myLink &&
										<li className="myStyle1">|</li>
									}

                                 

                                    <li><b>id:</b> {this.props.record.id}</li>

                                    <li className="myStyle1">|</li>

                                    <li>{this.props.record.location.lat}</li>
									
                                    <li className="myStyle1">|</li>

                                    <li>{this.props.record.location.lng}</li>
									
									
									{
										editLink &&
										<li className="myStyle1">|</li>
									}
									{
										editLink &&
										<li><Link to={editLink}>Edit</Link></li>
									}
									
									{
										deleteLink &&
										<li className="myStyle1">|</li>
									}
									{
										deleteLink &&
										<li><a href="" onClick={this.deleteRecord.bind(this, this.props.record)}>Delete</a></li>
									}
                                </ul>

                                <p className="hidden-xs">{this.props.record.description}</p>
								<p className="hidden-xs">{myDateStr}</p>
								<span className="fnt-smaller fnt-lighter fnt-arial">{this.props.record.tags}</span>
                            </div>
                        </div>
                    </div>
			</div>
		);
	}
}

export default Results;