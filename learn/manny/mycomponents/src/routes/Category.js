import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import Home2 from './Home2.js';

class Category extends Component {
	render() {
		console.log(this.props);
		return (
			<div> <ul>
				<li><Link to={`${this.props.match.url}/shoes`}>Shoes</Link></li>
				<li><Link to={`${this.props.match.url}/boots`}>Boots</Link></li>
				<li><Link to={`${this.props.match.url}/footwear`}>Footwear</Link></li>
			
			  </ul>
			  <Route exact path={`${this.props.match.path}/:name/:name2`} component={Home2}/>
			  <Route exact path={`${this.props.match.path}/:name`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
			  </div>
		);
	}
}

export default Category;