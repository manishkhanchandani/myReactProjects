import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'; 

import Nav from './Nav.js';
import Sample from './Sample.js';
import RomanToInteger from './problems/easy/RomanToInteger.js';
import ValidParenthesis from './problems/easy/ValidParenthesis.js';
import RemoveDuplicateFromSortedArray from './problems/easy/RemoveDuplicateFromSortedArray.js';
import Template from './problems/hard/Template.js';
import RegularExpressionMatching from './problems/hard/RegularExpressionMatching.js';
import MergekSortedLists from './problems/hard/MergekSortedLists.js';
import ReverseNodesinkGroup from './problems/hard/ReverseNodesinkGroup.js';
import SearchinRotatedSortedArray from './problems/hard/SearchinRotatedSortedArray.js';
import WildcardMatching from './problems/hard/WildcardMatching.js';
import MergeIntervals from './problems/hard/MergeIntervals.js';
import InsertInterval from './problems/hard/InsertInterval.js';
import MinimumWindowSubstring from './problems/hard/MinimumWindowSubstring.js';
import MaximalRectangle from './problems/hard/MaximalRectangle.js';
import PopulatingNextRightPointers from './problems/hard/PopulatingNextRightPointers.js';
import LongestConsecutiveSequence from './problems/hard/LongestConsecutiveSequence.js';
import LRUCache from './problems/hard/LRUCache.js';
import ReadNCharacters from './problems/hard/ReadNCharacters.js';
import TheSkylineProblem from './problems/hard/TheSkylineProblem.js';
import PaintHouseII from './problems/hard/PaintHouseII.js';
import AlienDictionary from './problems/hard/AlienDictionary.js';
import IntegertoEnglishWords from './problems/hard/IntegertoEnglishWords.js';
import ExpressionAddOperators from './problems/hard/ExpressionAddOperators.js';
import SerializeDeserializeBinaryTree from './problems/hard/SerializeDeserializeBinaryTree.js';
import RemoveInvalidParentheses from './problems/hard/RemoveInvalidParentheses.js';

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
					<Route path='/template' component={Template}/>
					<Route path='/RegularExpressionMatching' component={RegularExpressionMatching}/>
					<Route path='/MergekSortedLists' component={MergekSortedLists}/>
					<Route path='/ReverseNodesinkGroup' component={ReverseNodesinkGroup}/>
					<Route path='/SearchinRotatedSortedArray' component={SearchinRotatedSortedArray}/>
					<Route path='/WildcardMatching' component={WildcardMatching}/>
					<Route path='/MergeIntervals' component={MergeIntervals}/>
					<Route path='/InsertInterval' component={InsertInterval}/>
					<Route path='/MinimumWindowSubstring' component={MinimumWindowSubstring}/>
					<Route path='/MaximalRectangle' component={MaximalRectangle}/>
					<Route path='/PopulatingNextRightPointers' component={PopulatingNextRightPointers}/>
					<Route path='/LongestConsecutiveSequence' component={LongestConsecutiveSequence}/>
					<Route path='/LRUCache' component={LRUCache}/>
					<Route path='/ReadNCharacters' component={ReadNCharacters}/>
					<Route path='/TheSkylineProblem' component={TheSkylineProblem}/>
					<Route path='/PaintHouseII' component={PaintHouseII}/>
					<Route path='/AlienDictionary' component={AlienDictionary}/>
					<Route path='/IntegertoEnglishWords' component={IntegertoEnglishWords}/>
					<Route path='/ExpressionAddOperators' component={ExpressionAddOperators}/>
					<Route path='/SerializeDeserializeBinaryTree' component={SerializeDeserializeBinaryTree}/>
					<Route path='/RemoveInvalidParentheses' component={RemoveInvalidParentheses}/>
				</Switch>
				</div>
			</div>
		);
	}
}

export default Home;