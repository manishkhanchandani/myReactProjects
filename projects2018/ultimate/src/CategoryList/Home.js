import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

class Home extends Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		const singleEvent = "Single's Events";
		return (
			<div className="container">
				<h2>Services Provided by Categorylist.us</h2>
				<div className="row">
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-tags fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Coupons</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Cleaning</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-male fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Handyman</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-graduation-cap fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Tutors</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-crosshairs fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Beauty / Hair Cut</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Massage</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-heart fa-stack-1x fa-inverse"></i>
						</span>
						<h3>{singleEvent}</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bed fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Snugglers / Cuddlers</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-gift  fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Gifts</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-cutlery fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Food Donation</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-money fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Money Donation</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Business Directory</h3>
					</div>
					<div className="col-md-3 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-car fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Automotive</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Movers</h3>
					</div>
				</div>
				
				<hr />
				
				<div className="row">
					<h2>Backend Services in Categorylist.us</h2>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Provide Service</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Become City Manager</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;