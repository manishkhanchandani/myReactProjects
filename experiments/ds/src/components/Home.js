import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'; 

import Nav from './Nav.js';
import Sample from './Sample.js';
import RomanToInteger from './problems/easy/RomanToInteger.js';
import ValidParenthesis from './problems/easy/ValidParenthesis.js';
import RemoveDuplicateFromSortedArray from './problems/easy/RemoveDuplicateFromSortedArray.js';

class Home extends Component {
	render() {
		return (
			<div>
				<Nav />
				<div className="container">
				<Switch>
					<Route exact path='/sample' component={Sample}/>
					<Route path='/sample/:number' component={Sample}/>
					<Route exact path='/roman-to-integer' component={RomanToInteger}/>
					<Route exact path='/valid-parenthesis/' component={ValidParenthesis} />
					<Route exact path='/remove-duplicate-from-sorted-array' component={RemoveDuplicateFromSortedArray}/>
				</Switch>
				</div>
			</div>
		);
	}
}

export default Home;