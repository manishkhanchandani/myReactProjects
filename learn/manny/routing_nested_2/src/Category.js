import React, {Component} from 'react';
import { Link, Route, Switch } from 'react-router-dom';

class Category extends Component {
	render() {
		return (
			<div> <ul>
    <li><Link to={`${this.props.match.url}/shoes`}>Shoes</Link></li>
    <li><Link to={`${this.props.match.url}/boots`}>Boots</Link></li>
    <li><Link to={`${this.props.match.url}/footwear`}>Footwear</Link></li>

  </ul>
  <Route path={`${this.props.match.path}/:name`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
  </div>
		);
	}
}

export default Category;