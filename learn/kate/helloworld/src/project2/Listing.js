import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 

class Listing extends Component {
	render() {
		return (
<div>
<h1>Listing</h1>
<div><Link to="/detail/1/car">Real Property 1</Link></div>
<div><Link to="/detail/2/bike">Real Property 2</Link></div>
<div><Link to="/detail/3/house">Real Property 3</Link></div>
</div>
		);
	}
}

export default Listing;