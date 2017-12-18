import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Dropdown, MenuItem, ButtonToolbar} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import YouTube from 'react-youtube';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import * as issuesAction from './IssuesAction.js';


class EssayIssues extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			subjects: null,
			subject: null,
			subjectKey: null,
			issues: null,
			issue: null,
			video: null,
			selectedEssay: null,
			selectedMBE: null
		};
	}
	
	componentDidMount() {
		this.props.callGetSubjects(this.props.match.params.subject, this.props.match.params.issue);
	}

	render() {
		let subjects = null;
		if (this.props.issuesReducer.subjects) {
			subjects = [];
			for (let key in this.props.issuesReducer.subjects) {
				subjects.push(this.props.issuesReducer.subjects[key]);
			}
		}
		
		let subject = this.props.issuesReducer.subject;

		let issues = null;
		if (this.props.issuesReducer.issues) {
			issues = [];
			for (let key in this.props.issuesReducer.issues) {
				issues.push(this.props.issuesReducer.issues[key]);
			}
		}
		
		let issue = this.props.issuesReducer.issue;
			
		const opts = {
		  playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 1
		  }
		};
			
		return (
			<div className="container issues">
				
				<div className="row">						
					<div className="col-md-12">
						<h3>{
								(subject && subject.key) &&
								<span>{subject.name}</span>
							}
							{
								issue && 
								<span> :: {issue.name}</span>
							}
						</h3>
						{
							issue &&
							<div className="row myFavText">
								<div className="col-md-6">
									<div>
										<b>Rule: </b> {renderHTML(issue.rule)}
									</div>
									{
										issue.elements &&
										<div className="divider">
											<b>Elements to Prove: </b> 
											<ul>
												{
													issue.elements.map((value, key) => {
														return <li key={key}>{value}</li>							   
													})	
												}
											</ul>
										</div>
									}
									{
										issue.elementsQuestions &&
										<div className="divider">
											<b>Sample Essay Format: </b> 
											<div>
												{
													issue.elementsQuestions.map((value, key) => {
														return <span key={key}>{renderHTML(value)} </span>							   
													})	
												}
											</div>
											<div className="divider">
												{issue.conclusion}
											</div>
										</div>
									}
									{
										issue.urls &&
										<div className="divider">
											<div>
												<b>External Links: </b> 
											</div>
											<ul>
												{
													issue.urls.map((value, key) => {
														return <li key={key}><a href={value.link} target="_blank">{value.title}</a></li>							   
													})	
												}
											</ul>
										</div>
									}
									{
										issue.videos &&
										<div className="divider">
											<b>Videos: </b> 
											<ul>
												{
													issue.videos.map((value, key) => {
														return <li key={key}><a href="" onClick={(e) => {e.preventDefault(); this.setState({video: value})}}>{value.title}</a></li>							   
													})	
												}
												
												{
													this.state.video &&
													<li key="close"><a href="" onClick={(e) => {e.preventDefault(); this.setState({video: null})}}>Close Video</a></li>
												}
											</ul>
											{
												this.state.video &&
												<div className="embed-responsive embed-responsive-16by9">
												  <YouTube
													videoId={this.state.video.key}
													opts={opts}
													className="embed-responsive-item"
												  />
												</div>
											}
										</div>
									}
								</div>
								<div className="col-md-6">
									{
										issue.essays &&
										<div className="essays">
											<div>
												<b>Essays To Practice: </b> Click on each of the following hypo and try to write the essay related to "{issue.name}" only in the following textarea.
											</div>
											<ul>
												{
													issue.essays.map((value, key) => {
														return <li key={key}><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedEssay: value});}}>{value.year}</a></li>							   
													})	
												}
												{
													this.state.selectedEssay &&
													<li key="close"><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedEssay: null})}}>Close Textarea</a></li>
												}
											</ul>
											{
												this.state.selectedEssay &&
												<div>
													<div className="divider">
														<b>Year: </b> {this.state.selectedEssay.year}
													</div>
													<div className="divider">
														<b>Hypo: </b> {renderHTML(this.state.selectedEssay.hypo)}
													</div>
													<div className="divider">
													<textarea className="form-control" rows="10"></textarea>
													</div>
													<div className="divider">
													<Button className="form-control" bsStyle="primary">Submit</Button>
													</div>
												</div>
											}
										</div>
									}
									
									
									
									{
										issue.mbe &&
										<div className="mbe">
											<div>
												<b>MBE Ideas: </b> Click on each of the following Ideas and try to understand the idea related to "{issue.name}".
											</div>
											<ul>
												{
													issue.mbe.map((value, key) => {
														return <li key={key}><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedMBE: value});}}>{value.name}</a></li>							   
													})	
												}
												{
													this.state.selectedMBE &&
													<li key="close"><a href="" onClick={(e) => {e.preventDefault(); this.setState({selectedMBE: null})}}>Close Idea</a></li>
												}
											</ul>
											{
												this.state.selectedMBE &&
												<div>
													<div className="divider">
														Name:  <b>{this.state.selectedMBE.name}</b>
													</div>
													<div className="divider">
														<b>Description: </b> {renderHTML(this.state.selectedMBE.description)}
													</div>
												</div>
											}
										</div>
									}
									
									
									
									
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issuesReducer: state.IssuesReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callGetSubjects: (subject=null, issue=null) => {
			issuesAction.getSubjects(dispatch, subject, issue);
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EssayIssues));