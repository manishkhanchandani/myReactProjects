import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Dropdown, MenuItem, ButtonToolbar} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import YouTube from 'react-youtube';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';

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
	
	getSubjects() {
		var url = FirebaseConstant.basePath + '/quiz/subjects';
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			var result = snapshot.val();			
			this.setState({subjects: result}, () => {
				if (this.props.match.params.subject) {
					this.selectSubject(this.props.match.params.subject);	
				}								   
			});
			
		});
	}

	componentWillUnmount(){
	}
	componentDidMount() {
	}
	
	selectIssue(value) {
		if (!this.state.issues) {
			return false;	
		}

		//if (!this.props.match.params.issue) {
			//window.location.href = "/essays/issues/"+this.props.match.params.subject+"/"+value;
			//return;
		//}
		this.setState({issue: this.state.issues[value]});		
	}

	selectSubject(eventKey) {
		//if (!this.props.match.params.subject) {
			//window.location.href = "/essays/issues/"+eventKey;
			//return;
		//}
		if (!this.props.issuesReducer.subjects) {
			return;	
		}
		var value = this.props.issuesReducer.subjects[eventKey];
		this.setState({subjectKey: value.key, subject: value.name, issues: null, issue: null});
		
		var urlIssue = FirebaseConstant.basePath + '/quiz/issues/'+value.key;
		var refIssue = firebaseDatabase.ref(urlIssue);
		refIssue.once('value', (snapshot) => {
			var result = snapshot.val();			
			this.setState({issues: result}, () => {
				if (this.props.match.params.issue) {
					this.selectIssue(this.props.match.params.issue);	
				}								 
			});
			
		});
	}

	render() {
		let subjects = null;
		if (this.props.issuesReducer.subjects) {
			subjects = [];
			for (let key in this.props.issuesReducer.subjects) {
				subjects.push(this.props.issuesReducer.subjects[key]);
			}
		}
		
		let issues = null;
		if (this.state.issues) {
			issues = [];
			for (let key in this.state.issues) {
				issues.push(this.state.issues[key]);
			}
		}
			
		const opts = {
		  playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 1
		  }
		};
			
		return (
			<div className="container issues">
				
				<div className="row">
					<div className="col-md-3">
						<h3>Essay Issue Practice</h3>
					{
						subjects &&
						<ButtonToolbar>
							<Dropdown id="dropdown-custom-1" onSelect={this.selectSubject.bind(this)}>
							  <Dropdown.Toggle>
								Subjects
							  </Dropdown.Toggle>
									  <Dropdown.Menu className="super-colors">
									  {
											subjects.map((value, key) => {
												return <MenuItem key={key} eventKey={value.key}>{value.name}</MenuItem>	
											})
									  }
									  </Dropdown.Menu>
							</Dropdown>
						
						  </ButtonToolbar>
					}
					
					<h3>{this.state.subject}</h3>
					{
						issues &&
						<ButtonToolbar>
							<Dropdown id="dropdown-custom-1" onSelect={this.selectIssue.bind(this)}>
							  <Dropdown.Toggle>
								Issues
							  </Dropdown.Toggle>
									  <Dropdown.Menu className="super-colors">
									  {
											issues.map((value, key) => {
												return <MenuItem key={key} eventKey={value.key}>{value.name}</MenuItem>	
											})
									  }
									  </Dropdown.Menu>
							</Dropdown>
						
						  </ButtonToolbar>
					}
					</div>
					<div className="col-md-9">
						<h3>{this.state.subject}
							{
								this.state.issue && 
								<span> :: {this.state.issue.name}</span>
							}
						</h3>
						{
							this.state.issue &&
							<div className="row myFavText">
								<div className="col-md-6">
									<div>
										<b>Rule: </b> {renderHTML(this.state.issue.rule)}
									</div>
									{
										this.state.issue.elements &&
										<div className="divider">
											<b>Elements to Prove: </b> 
											<ul>
												{
													this.state.issue.elements.map((value, key) => {
														return <li key={key}>{value}</li>							   
													})	
												}
											</ul>
										</div>
									}
									{
										this.state.issue.elementsQuestions &&
										<div className="divider">
											<b>Sample Essay Format: </b> 
											<div>
												{
													this.state.issue.elementsQuestions.map((value, key) => {
														return <span key={key}>{renderHTML(value)} </span>							   
													})	
												}
											</div>
											<div className="divider">
												{this.state.issue.conclusion}
											</div>
										</div>
									}
									{
										this.state.issue.urls &&
										<div className="divider">
											<div>
												<b>External Links: </b> 
											</div>
											<ul>
												{
													this.state.issue.urls.map((value, key) => {
														return <li key={key}><a href={value.link} target="_blank">{value.title}</a></li>							   
													})	
												}
											</ul>
										</div>
									}
									{
										this.state.issue.videos &&
										<div className="divider">
											<b>Videos: </b> 
											<ul>
												{
													this.state.issue.videos.map((value, key) => {
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
										this.state.issue.essays &&
										<div className="essays">
											<div>
												<b>Essays To Practice: </b> Click on each of the following hypo and try to write the essay related to "{this.state.issue.name}" only in the following textarea.
											</div>
											<ul>
												{
													this.state.issue.essays.map((value, key) => {
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
										this.state.issue.mbe &&
										<div className="mbe">
											<div>
												<b>MBE To Practice: </b> Click on each of the following Ideas and try to understand the idea related to "{this.state.issue.name}". After that try to answer the related mbe questions.
											</div>
											<ul>
												{
													this.state.issue.mbe.map((value, key) => {
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
		callGetSubjects: (subject=null) => {
			issuesAction.getSubjects(dispatch, subject);
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(EssayIssues);