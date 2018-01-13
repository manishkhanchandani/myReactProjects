import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import {getUID} from '../auth/AuthAction.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {connect} from 'react-redux';
import * as issuesAction from './IssuesAction.js';
import FlashCard from '../FlashCard/FlashCard.js';

//https://github.com/zenoamaro/react-quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class IssuesRule extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			showBox: false
		};
	}
	
  
	addRule() {
		let uid = getUID();
		let uidPath = '/' + uid;
		let subject = '/' + this.props.s;
		let issue = '/' + this.props.i;
		let obj = {};
		obj.updated_dt = firebase.database.ServerValue.TIMESTAMP;
		obj.rule = this.refs.rule.state.value;	
		obj.flashCard = this.refs.flashCard.checked;
		var url = FirebaseConstant.basePath + '/quiz/rules' + uidPath + subject + issue;
		firebaseDatabase.ref(url).update(obj);
		this.props.f_babybarRules(uid, this.props.s, this.props.i);
		this.setState({showBox: false});
	}

	render() {
		let currentIssueRules = this.props.currentIssueRules;
		if (!currentIssueRules) {
			//return null;
			currentIssueRules = {};
		}
		return (
			<div className="panel panel-primary">
				<div className="panel-heading"><b>Rule</b>
				{
						currentIssueRules.rule && 
						<div className="pull-right">
							<a href="" className="ruleBoxLink" onClick={(e) => {e.preventDefault(); this.setState({showBox: true});}}>Edit</a>
						</div>
				}
				</div>
				<div className="panel-body">
					{
						!currentIssueRules.rule && 
						<div>
							<ReactQuill theme="snow" ref="rule" value="" placeholder="Add your rule here" className="rulebox" modules={{
    toolbar: [
      ['bold', 'italic', 'underline']
    ],
  }} />
							<br />
							<input type="checkbox" ref="flashCard" /> Use this rule for Flash Card
							<br />
							<br />
							<Button className="form-control" bsStyle="primary" onClick={this.addRule.bind(this)}>Add Rule</Button>
						</div>
					}
					
					{
						currentIssueRules.rule && 
						<div>
							
							{
								this.state.showBox &&
								<div>
									<br />
									<ReactQuill theme="snow" ref="rule" value={currentIssueRules.rule} placeholder="Add your rule here" className="rulebox" modules={{
    toolbar: [
      ['bold', 'italic', 'underline']
    ],
  }} />
									<br />
									<input type="checkbox" ref="flashCard" defaultChecked={currentIssueRules.flashCard} /> Use this rule for Flash Card
									<br />
									<br />
									<Button className="form-control" bsStyle="primary" onClick={this.addRule.bind(this)}>Update Rule</Button>
									<br />
									<br />
								</div>
							}
							<div>
								{
									currentIssueRules.flashCard ?
									<div className="FlashCard">
										<FlashCard frontContent={this.props.frontContent} backContent={renderHTML(currentIssueRules.rule)} />
									</div>
									:
									<div>{renderHTML(currentIssueRules.rule)}</div>
								}
								
							</div>
							
						</div>
					}
				</div>
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