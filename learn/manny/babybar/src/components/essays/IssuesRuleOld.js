import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import {getUID} from '../auth/AuthAction.js';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {connect} from 'react-redux';
import * as issuesAction from './IssuesAction.js';

//https://github.com/zenoamaro/react-quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class IssuesRule extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			rule: '',
			showBox: false
		};
	}
	
	handleChange (html) {
		this.setState({ rule: html });
	}
  
	addRule() {
		let uid = getUID();
		let uidPath = '/' + uid;
		let subject = '/' + this.props.s;
		let issue = '/' + this.props.i;
		var url = FirebaseConstant.basePath + '/quiz/rules' + uidPath + subject + issue;
		var ref = firebaseDatabase.ref(url).child('rule').set(this.state.rule);
		this.props.f_babybarRules(uid, this.props.s, this.props.i);
		this.setState({showBox: false});
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.currentIssueRules) {
			this.setState({rule: nextProps.currentIssueRules.rule});
		}
	}
	render() {
		console.log('this state is ', this.state);
		let currentIssueRules = this.props.currentIssueRules;
		if (!currentIssueRules) {
			//return null;
			currentIssueRules = {};
		}

		return (
			<div>
				{/*
					 issue.rule &&
					<div className={`panel panel-${sitePanelClass_1}`}>
						<div className="panel-heading"><b>Rule</b></div>
						<div className="panel-body">
							{renderHTML(issue.rule)}
						</div>
					</div>
				*/}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issuesReducer: state.IssuesReducer,
		simpleQuizReducer: state.SimpleQuizReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		f_babybarRules: (u=null, s=null, i=null) => {
			if (!u || !s || !i) {
				return;	
			}
			dispatch(issuesAction.babybarRules(u, s, i));	
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesRule);