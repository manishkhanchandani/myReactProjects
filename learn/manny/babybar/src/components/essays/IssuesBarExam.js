import React, {Component} from 'react';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getUID} from '../auth/AuthAction.js';
import renderHTML from 'react-render-html';
import {Button} from 'react-bootstrap';

class IssuesBarExam extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			selectedEssay: null,
			viewFullEssay: false,
			showSamples: false
		};
	}
	
	selectEssay(obj, data, e)
	{
		e.preventDefault();		
		let records = data.filter((rec) => {
			return rec.id === obj.id;
		});
		
		if (!records) {
			return false;	
		}
		
		let record = records[0];
		
		obj.hypo = record.hypo;
		obj.issues = record.issues;
		obj.topic = record.topic;
		this.setState({selectedEssay: obj})
	}
	updateEssayText(e) {
		this.setState(
			{
				selectedEssay: 
				{
					...this.state.selectedEssay, 
					text: e.target.value
				}
			}
		);	
	}
	submitEssay() {
		if (!this.props.subject) {
			return;
		}
		if (!this.props.issue) {
			return;
		}
		let uid = getUID();
		if (!uid) {
			return;
		}
		let subject = '';
		subject = '/' + this.props.subject;
		let issue = '';
		issue = '/' + this.props.issue;
		let uidPath = '/' + uid;
		
		var obj = {};
		obj.text = this.state.selectedEssay.text;
		obj.key = this.state.selectedEssay.key;
		obj.year = this.state.selectedEssay.year;
		obj.qid = this.state.selectedEssay.qid;
		obj.topic = this.state.selectedEssay.topic;
		obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
		var url = FirebaseConstant.basePath + '/quiz/issues_answers' + uidPath + subject + issue;
		firebaseDatabase.ref(url).push(obj);
		this.setState({selectedEssay: null, viewFullEssay: false, showSamples: false});
	}
	render() {
		if (!this.props.subject) {
			return null;	
		}
		if (!this.props.issue) {
			return null;	
		}
		if (!this.props.issuesReducer.baby_bar_exam) {
			return null;	
		}
		if (!this.props.issuesReducer.baby_bar_exam[this.props.subject]) {
			return null;	
		}
		let baby_bar_exam = this.props.issuesReducer.baby_bar_exam[this.props.subject];
		if (!baby_bar_exam) {
			return null;	
		}

		let exam_term_definition = null;
		let exam_data = null;
		exam_term_definition =  baby_bar_exam.issues[this.props.issue];
		if (!exam_term_definition) {
			return null;	
		}
		exam_data = baby_bar_exam.exams;
		exam_term_definition.years = [];
		exam_term_definition.defs = [];
		if (Object.keys(exam_data).length > 0) {
			for(let i in exam_data) {
				let record = exam_data[i];
				if (record.issues[this.props.issue]) {
					let smallObj = {};
					smallObj.id = record.id;
					smallObj.year = record.reference;
					smallObj.essay = record.essay;
					smallObj.topic = record.topic;
					smallObj.data = record.issues[this.props.issue];
					if (smallObj.data.def && smallObj.data.def.length > 0) {
						for (let x = 0; x < smallObj.data.def.length; x++) {
							exam_term_definition.defs.push(smallObj.data.def[x]);
						}
					}
					
					exam_term_definition.years.push(smallObj);
				}
			}
		}

		return (
			<div>
				{
					(exam_term_definition.years && exam_term_definition.years.length > 0) &&
					<div className="panel panel-primary essays">
						<div className="panel-heading">Essays To Practice</div>
						<div className="panel-body">
							<div>Click on each of the following hypo and try to write the essay related to <b>"{this.props.issueDetails.name}"</b> only in the following textarea.<br /></div>
							<ol>
								{
									exam_term_definition.years.map((value, key) => {
										var obj = value;
										obj.text = '';
										obj.key = key;
										obj.qid = value.id;
										obj.year = value.year;
										return <li key={key}><a href="" onClick={this.selectEssay.bind(this, obj, exam_data)}>{value.year} (id: {value.id})</a></li>							   
									})	
								}
								{
									this.state.selectedEssay &&
									<li key="close"><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedEssay: null})}}>Close Textarea</a></li>
								}
							</ol>
							{
								this.state.selectedEssay &&
								<div>
									<div className="divider">
										<b>Year: </b> {this.state.selectedEssay.year}
									</div>
									{
										(this.state.selectedEssay.data && this.state.selectedEssay.data.hypo) &&
										<div className="divider">
											<b>Hypo: </b> {renderHTML(this.state.selectedEssay.data.hypo)}										
										</div>
									}
									{
										this.state.viewFullEssay &&
										<div className="divider">
											<b>Complete Essay: </b> {renderHTML(this.state.selectedEssay.essay)}
										</div>
									}
									{
										this.state.selectedEssay.essay &&
										<div className="divider">
											<a href="" onClick={(e) => {e.preventDefault(); this.setState({viewFullEssay: !this.state.viewFullEssay})}}><span>
												{
													!this.state.viewFullEssay ?
													'View Full Essay' :
													'Hide Full Essay'
												}
											</span></a>										
										</div>
									}
									{
										this.state.showSamples &&
											<div className="divider">
												<hr />
												{
													this.state.selectedEssay.data.samples.map((value, key) => {
														return <div key={key}><b>Sample {key + 1}</b><br /><br />{renderHTML(value)}<hr /></div>							   
													})	
												}
											</div>
									}
									
									{
										(this.state.selectedEssay.data.samples && this.state.selectedEssay.data.samples.length > 0) &&
										<div className="divider">
											<a href="" onClick={(e) => {e.preventDefault(); this.setState({showSamples: !this.state.showSamples})}}><span>
												{
													!this.state.showSamples ?
													'View Sample Answwers' :
													'Hide Sample Answwers'
												}
											</span></a>										
										</div>
									}
									
									<div className="divider">
									<textarea className="form-control" rows="10" value={this.state.selectedEssay.text} onChange={this.updateEssayText.bind(this)}></textarea>
									</div>
									<div className="divider">
									<Button className="form-control" bsStyle="primary" onClick={this.submitEssay.bind(this)}>Submit</Button>
									</div>
								</div>
							}
						</div>
					</div>
				}
				{
					(exam_term_definition.defs && exam_term_definition.defs.length > 0) &&
					<div className="panel panel-primary essays">
						<div className="panel-heading">Definitions in Babybar Exams</div>
						<div className="panel-body">
							{
								exam_term_definition.defs.map((value, key) => {
									return <div key={key}>{value} <hr /></div>							   
								})	
							}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default IssuesBarExam;