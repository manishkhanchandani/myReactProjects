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
				
				<div className="row">
					<h2>Backend Services in Categorylist.us</h2>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Become City Manager</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Become City Service Manager</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-bath fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Provide Service (Coming Soon)</h3>
					</div>
				</div>
				<hr />
				<h2>Services Provided by Categorylist.us</h2>
				<div className="row">

				</div>
				
				<hr />
				<h2>Services (Ariving Soon)</h2>
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
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Movers</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>MyFlix</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Online Homeopathic Treatment</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Remedy Finder</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Life Reminder</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>My Religion</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Ride Share</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Sell Your Products</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Real Estate</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Events</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Groups</h3>
					</div>
					<div className="col-md-3 col-xs-6 col-sm-6 text-center">
						<span className="fa-stack fa-lg fa-4x">
						  <i className="fa fa-circle fa-stack-2x fa-color"></i>
						  <i className="fa fa-truck fa-stack-1x fa-inverse"></i>
						</span>
						<h3>Dating</h3>
					</div>
				</div>
				
			</div>
		);
	}
}

export default Home;