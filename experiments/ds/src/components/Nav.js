import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';

import {actionGoogleLogin, actionSignOut} from '../actions/MyAction.js';


class Nav extends Component {
	
	googleLogin(e) {
		e.preventDefault();
		this.props.func1();
	}
	
	signOut(e) {
		e.preventDefault();
		this.props.func2();
	}
	
	render() {
		console.log('myReducer: ', this.props.myReducer);
		
		var showUser = [];
		var navItem1 = [];
		var rightSide = [];
		
		if (this.props.myReducer.uid) {
			showUser.push(<li key="3" className="myName">{this.props.myReducer.displayName}</li>);
			showUser.push(<li key="1"><a href="" onClick={this.signOut.bind(this)}>SignOut</a></li>);
			
			navItem1.push(<li key="1"><Link to="/create">Create</Link></li>);
			navItem1.push(<li key="2"><Link to="/">My Account</Link></li>);
			
			
			rightSide.push(<li key="1"><Link to="/">Messages</Link></li>);
		} else {
			showUser.push(<li key="2"><a href="" onClick={this.googleLogin.bind(this)}>Google Login</a></li>);
		}

		
		return (
			<nav className="navbar navbar-inverse navbar-static-top">
		  <div className="container">
			<div className="navbar-header">
			  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			  </button>
			  <Link className="navbar-brand" to="/">Data Structures And Algorithm</Link>
			</div>
			<div id="navbar" className="navbar-collapse collapse">
			  <ul className="nav navbar-nav">
				<li className="active"><Link to="/">Home</Link></li>
				<li className="dropdown">
				  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Easy <span className="caret"></span></a>
				  <ul className="dropdown-menu">
					<li><Link to="/roman-to-integer">13. Roman To Integer</Link></li>
					<li><Link to="/valid-parenthesis">20. Valid Parenthesis</Link></li>
					<li><Link to="/remove-duplicate-from-sorted-array">26. Remove Duplicate From Sorted Array</Link></li>
				  </ul>
				</li>
				<li className="dropdown">
				  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Medium <span className="caret"></span></a>
				  <ul className="dropdown-menu">
					<li><Link to="/roman-to-integer">Link 1</Link></li>
				  </ul>
				</li>
				<li className="dropdown">
				  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hard <span className="caret"></span></a>
				  <ul className="dropdown-menu">
					<li><Link to="/template">Template</Link></li>
					<li><Link to="/RegularExpressionMatching">10 Regular Expression Matching 22.0% Hard</Link></li>
					<li><Link to="/MergekSortedLists">23 Merge k Sorted Lists 23.3% Hard</Link></li>
					<li><Link to="/ReverseNodesinkGroup">25 Reverse Nodes in k-Group 27.5% Hard</Link></li>
					<li><Link to="/SearchinRotatedSortedArray">33 Search in Rotated Sorted Array 30.2% Hard</Link></li>
					<li><Link to="/WildcardMatching">44 Wildcard Matching 17.4% Hard</Link></li>
					<li><Link to="/MergeIntervals">56 Merge Intervals 25.3% Hard</Link></li>
					<li><Link to="/InsertInterval">57 Insert Interval 23.8% Hard</Link></li>
					<li><Link to="/MinimumWindowSubstring">76 Minimum Window Substring 21.2% Hard</Link></li>
					<li><Link to="/MaximalRectangle">85 Maximal Rectangle 23.4% Hard</Link></li>
					<li><Link to="/PopulatingNextRightPointers">117 Populating Next Right Pointers in Each Node II 32.8% Hard</Link></li>
					<li><Link to="/LongestConsecutiveSequence">128 Longest Consecutive Sequence 32.1% Hard</Link></li>
					<li><Link to="/LRUCache">146 LRU Cache 15.8% Hard</Link></li>
					<li><Link to="/ReadNCharacters">158 Read N Characters Given Read4 II Call multiple times 23.4% Hard</Link></li>
					<li><Link to="/TheSkylineProblem">218 The Skyline Problem 22.0% Hard</Link></li>
					<li><Link to="/PaintHouseII">265 Paint House II 35.6% Hard</Link></li>
					<li><Link to="/AlienDictionary">269 Alien Dictionary 22.9% Hard</Link></li>
					<li><Link to="/IntegertoEnglishWords">273 Integer to English Words 18.7% Hard</Link></li>
					<li><Link to="/ExpressionAddOperators">282 Expression Add Operators 24.8% Hard</Link></li>
					<li><Link to="/SerializeDeserializeBinaryTree">297 Serialize and Deserialize Binary Tree 27.8% Hard</Link></li>
					<li><Link to="/RemoveInvalidParentheses">301 Remove Invalid Parentheses 31.9% Hard</Link></li>
				  </ul>
				</li>
			  </ul>
			  <ul className="nav navbar-nav navbar-right">
				<li className="dropdown">
				  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
				  <ul className="dropdown-menu">
					{showUser}
				  </ul>
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		func1: () => {
			dispatch(actionGoogleLogin());
		},
		func2: () => {
			dispatch(actionSignOut());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);