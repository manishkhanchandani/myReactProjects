import React, {Component} from 'react';

class MyAccount extends Component {
	render() {
		return (
			<div className="container">
				<h3>My Created Food Donation Posts</h3>
				<div className="media">
				  <div className="media-left">
					<a href="#">
					  <img className="media-object myAccountImg" src="https://www.ndtv.com/cooks/images/mutton-biryani-new.jpg" alt="..." />
					</a>
				  </div>
				  <div className="media-body">
					<h4 className="media-heading">Middle aligned media</h4>
					<div>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</div>
					<div><a href="">Edit</a> | <a href="">Delete</a></div>
				  </div>
				</div>
				
				<div className="media">
				  <div className="media-left">
					<a href="#">
					  <img className="media-object myAccountImg" src="https://budgetbytes.com/wp-content/uploads/2009/12/Garlic-Noodles-front.jpg" alt="..." />
					</a>
				  </div>
				  <div className="media-body">
					<h4 className="media-heading">Middle aligned media</h4>
					<div>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</div>
					<div><a href="">Edit</a> | <a href="">Delete</a></div>
				  </div>
				</div>
				
				<div className="media">
				  <div className="media-left">
					<a href="#">
					  <img className="media-object myAccountImg" src="http://jonvilma.com/images/ice-cream-1.jpg" alt="..." />
					</a>
				  </div>
				  <div className="media-body">
					<h4 className="media-heading">Middle aligned media</h4>
					<div>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</div>
					<div><a href="">Edit</a> | <a href="">Delete</a></div>
				  </div>
				</div>
			</div>
		);
	}
}

export default MyAccount;