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
                            <a className="pull-left" href="" target="_parent">
                            <img alt="Record" className="img-responsive" src={image} /></a>

                            <div className="clearfix visible-sm"></div>

                            <div className="media-body fnt-smaller">

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
										<li><a href="" onClick={this.props.changeShowModal.bind(this, true, this.props.record)}>Delete</a></li>
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


//this.deleteRecord.bind(this, this.props.record)