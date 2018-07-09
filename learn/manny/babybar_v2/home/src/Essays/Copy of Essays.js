import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {onListEssays, listEssays, selectedEssay, postNewEssay, deleteEssay, addUpdateIssue, listIssues, deleteIssue} from './Essays.Action.js';
import {subjects, timeAgo} from '../utilities/functions.js';//, updateLoggedInTime
import './Essays.css';
import {getUsersObj, getUID} from '../auth/AuthAction.js';
import {Link} from 'react-router-dom';
import renderHTML from 'react-render-html';

//https://github.com/zenoamaro/react-quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EssayList extends Component {
	
	handleClick(essay, e) {
		e.preventDefault();
		this.props.callselectedEssay(essay);
	}

	render() {
		if (!this.props.essaysReducer.list_essay) return null;
		return (
			<ul>
				{
					this.props.essaysReducer.list_essay && 
					this.props.essaysReducer.list_essay.map((value, key) => {
						return (<li key={key}><Link to={`/essays/${this.props.match.params.subject}/${value.id}`}>{value.title}</Link></li>)								 
					})
				}
			</ul>
		);
	}
}

class EssaysAdd extends Component {
	constructor(props) {
		super(props)
		this.state = { text: '', title: '', type: 'public', emails: '' } // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleChange(value) {
		this.setState({ text: value })
	}
	
	addNewEssay() {
		let u = getUsersObj();
		let obj = {};
		obj.user = {};
		obj.user.name = u.displayName;
		obj.user.uid = u.uid;
		obj.user.img = u.photoURL;
		obj.title = this.state.title;
		obj.essay = this.state.text;
		obj.created = Date.now();
		obj.subject = this.props.match.params.subject;
		obj.status = 1;
		obj.type = this.state.type;
		obj.emails = '';
		if (obj.type === 'private') {
			obj.emails = this.state.emails;	
		}
		this.props.callpostNewEssay(obj.subject, obj, (id) => {
			this.setState({text: '', title: '', emails: ''});			
		});
	}

	render() {
		return (
			<div>
				<br />
				<div className="form-group">
					<label>Title *</label>
					<input type="text" className="form-control" placeholder="Enter Title" value={this.state.title} onChange={(e) => {
						this.setState({title: e.target.value});	
					}} />
				</div>
				<div className="form-group">
					<label>Essay Details *</label>
					<ReactQuill theme="snow" value={this.state.text}
								  onChange={this.handleChange} placeholder="Essay" className="rulebox" modules={{
				toolbar: [
					  [{ 'header': [1, 2, 3, false] }],
					  ['bold', 'italic', 'underline','strike', 'blockquote'],
					  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
					  ['link', 'image'],
					  ['clean']
					],
				}} />
				</div>
				
				<div className="form-group">
					<label>Privacy </label><br />
					<div className="row">
						<div className="col-md-4">
							<input type="radio" name="type" value="private" onClick={(e) => { this.setState({type: e.target.value});}} /> Private
						</div>
						<div className="col-md-8">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Comma Separated Emails" value={this.state.emails} onChange={(e) => {
									this.setState({emails: e.target.value});	
								}} />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<input type="radio" name="type" value="public" defaultChecked={true}  onClick={(e) => { this.setState({type: e.target.value});}} /> Public
						</div>
					</div>
					
				</div>
				<br />
				<br />
				<Button className="form-control" bsStyle="primary" onClick={this.addNewEssay.bind(this)}>Add New Essay</Button>
			</div>		
		);	
	}
}


class MyIssues extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			id: {}	
		};
	}
	
	render() {
		//if (!this.props.show) return null;
		if (!this.props.essaysReducer.selected_essay) return null;
		const id = this.props.essaysReducer.selected_essay.id;
		const essay = this.props.essaysReducer.list_essay_obj[id];
		if (!essay) return null;
		if (!essay.issues) return null;
		let uid = this.props.uid;
		
		let myIssue = [];
		for (let key in essay.issues) {
			let issue = essay.issues[key];
			if (uid) {
				if (issue.user.uid === uid) {
					myIssue.push(issue);
				}
			} else {
				myIssue.push(issue);
			}
		}
		return (
			<div>
				<div className="list-group">
					{
						myIssue && 
						myIssue.map((value, key) => {
							return <div key={key} className="list-group-item">
								<h4 className="list-group-item-heading">{value.issue} <span className="pull-right"><a href="" onClick={(e) => {e.preventDefault(); let a = {...this.state.id}; a[value.id] = !a[value.id]; this.setState({id: a});}}><img src="/img/view16.png" alt="view" /></a> 
								{
									uid && 
									<img src="/img/edit16.png" alt="view" />
								}
								{
									uid && 
									<img src="/img/delete16.png" alt="view" />
								}
								</span></h4>
								{
									this.state.id[value.id] && 
									<div>{renderHTML(value.analysis)}</div>
								}
								{
									!uid && 
									<div>
										<hr />
										<div className="row">
											<div className="col-md-12">
												<b className="pull-right">By {value.user.name}</b>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<span className="pull-right">{timeAgo(value.created)}</span>
											</div>
										</div>
									</div>
								}
							</div>		 
						})
					}
					
				</div>
			</div>
		);
	}
}




class IssuesAdd extends Component {
	constructor(props) {
		super(props)
		this.state = { text: '', title: '', issue: '', type: 'existing', existing: '', sorting: 0 } // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleChange(value) {
		this.setState({ text: value })
	}
	
	addNewIssue() {
		let obj = {};
		if (this.state.type === 'new') {
			obj.issue = this.state.issue;
		} else if (this.state.type === 'existing') {
			obj.issue = this.state.existing;
		}
		if (!obj.issue) {
			alert('issue missing');
			return;
		}
		obj.essay = this.props.essaysReducer.selected_essay.id;
		if (!obj.essay) {
			alert('essay missing');
			return;
		}
		//user details
		let u = getUsersObj();
		obj.user = {};
		obj.user.name = u.displayName;
		obj.user.uid = u.uid;
		obj.user.img = u.photoURL;
		
		obj.analysis = this.state.text;
		obj.sorting = this.state.sorting;
		obj.created = Date.now();
		obj.subject = this.props.match.params.subject;
		obj.status = 1;
		this.props.calladdUpdateIssue(obj.essay, obj.subject, obj, (id) => {
			this.setState({ text: '', title: '', issue: '', type: 'existing', existing: '', sorting: 0 });			
		});
	}

	render() {
		return (
			<div>
				<br />
				<div className="form-group">
					<label>Issue * </label><br />
					<div className="row">
						<div className="col-md-3">
							<input type="radio" name="type" value="new" onClick={(e) => { this.setState({type: e.target.value});}} /> New
						</div>
						<div className="col-md-9">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter New Issue" value={this.state.issue} onChange={(e) => {
									this.setState({issue: e.target.value});	
								}} />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<input type="radio" name="type" value="existing" defaultChecked={true}  onClick={(e) => { this.setState({type: e.target.value});}} /> Existing
						</div>
						<div className="col-md-8">
							<select className="form-control" value={this.state.existing} onChange={(e) => { console.log(e.target.value); this.setState({existing: e.target.value}); }}>
								<option value="">Select from following issues:</option>
								{
									subjects[this.props.match.params.subject].issues.map((value, key) => {
										return <option value={value} key={key}>{value}</option>
									})
								}
							</select>
						</div>
					</div>
					
				</div>
				<div className="form-group">
					<label>Analysis *</label>
					<ReactQuill theme="snow" value={this.state.text}
								  onChange={this.handleChange} placeholder="Write Your Analysis in IRAC Format" className="rulebox" modules={{
				toolbar: [
					  [{ 'header': [1, 2, 3, false] }],
					  ['bold', 'italic', 'underline','strike', 'blockquote'],
					  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
					  ['link', 'image'],
					  ['clean']
					],
				}} />
				</div>
				<div className="form-group">
					<label>Sorting</label>
					<input type="text" className="form-control" placeholder="Sorting" value={this.state.sorting} onChange={(e) => {
						this.setState({sorting: parseInt(e.target.value, 10)});	
					}} />
				</div>
				<br />
				<Button className="form-control" bsStyle="primary" onClick={this.addNewIssue.bind(this)}>Add New Issue</Button>
			</div>		
		);	
	}
}


class Essays extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			subject: null,
			id: null,
			allIssues: null,
			myIssues: null
		};
	}
	
	fetchParticular(id, records) {
		if (!records) return null;
		let arr = records.filter((rec) => {
			return id === rec.id;
		});
		if (arr[0]) {
			this.props.callselectedEssay(arr[0]);
		}	
	}
	
	componentDidMount() {
		this.props.callonListEssays(this.props.match.params.subject);
		/*
		this.props.calllistEssays(this.props.match.params.subject, {}, (data) => {
			if (this.props.match.params.id) {
				this.fetchParticular(this.props.match.params.id, data);
			} else {
				this.props.callselectedEssay(data[0]);	
			}
		});*/
		//this.setState({subject: this.props.match.params.subject, id: this.props.match.params.id});
		//update user login
		//updateLoggedInTime();
	}
	
	componentWillReceiveProps(nextProps) {
		
		if (!(this.state.subject === nextProps.match.params.subject && this.state.id === nextProps.match.params.id) && nextProps.essaysReducer.list_essay && nextProps.match.params.id && nextProps.match.params.subject) {
			this.setState({subject: nextProps.match.params.subject, id: nextProps.match.params.id});
			//this.fetchParticular(nextProps.match.params.id, nextProps.essaysReducer.list_essay, nextProps.essaysReducer.selected_essay);
		}
		if (!this.state.id && !nextProps.match.params.id && nextProps.essaysReducer.list_essay && nextProps.match.params.subject && nextProps.essaysReducer.list_essay[0]) {
			let selRecord = nextProps.essaysReducer.list_essay[0];
			this.setState({subject: nextProps.match.params.subject, id: selRecord.id});
			//this.props.callselectedEssay(selRecord, nextProps.essaysReducer.selected_essay);
			
		}
		/*if (!(this.state.subject === nextProps.match.params.subject && this.state.id === nextProps.match.params.id)) {
			console.log('nextprops are: ', nextProps);
			this.setState({subject: nextProps.match.params.subject, id: nextProps.match.params.id});
			console.log(this.props.essaysReducer.list_essay);
			let arr = this.props.essaysReducer.list_essay.filter((rec) => {
				return nextProps.match.params.id === rec.id;
			});
			if (arr[0]) {
				this.props.callselectedEssay(arr[0]);
			}
			//update user login
			updateLoggedInTime();
		}*/
	}

	render() {
		const subject = this.props.match.params.subject;
		if (!subject) {
			return null;	
		}
		const subjectDetails = subjects[subject];
		let uid = getUID();
		return (
			<div className="page-essay">
				<h3>Essays : {subjectDetails.name}</h3>
				<div className="row">
					<div className="col-md-5">
						{
							this.props.essaysReducer.selected_essay && 
							<div className="panel panel-primary">
								<div className="panel-heading">{this.props.essaysReducer.selected_essay.title}</div>
								<div className="panel-body">
									{renderHTML(this.props.essaysReducer.selected_essay.essay)}
								</div>
							</div>
						}
					</div>
					<div className="col-md-4">
						{
							this.props.essaysReducer.selected_essay && 
							<div>
								<div className="panel panel-primary">
									<div className="panel-heading">My Issues</div>
									<div className="panel-body">
										<MyIssues {...this.props} uid={uid} show={this.state.myIssues} />
									</div>
								</div>
								<div className="panel panel-primary">
									<div className="panel-heading">Add New Issue</div>
									<div className="panel-body">
										<IssuesAdd {...this.props} />
									</div>
								</div>
								<div className="panel panel-primary">
									<div className="panel-heading">All Issues</div>
									<div className="panel-body">
										<MyIssues {...this.props} show={this.state.allIssues} />
									</div>
								</div>
							</div>
						}
						
						
					</div>
					<div className="col-md-3">
						<hr />
						<div><b>Choose Essay</b></div>
						<EssayList {...this.props} />
						<hr />
						<div><b>Add New Essay</b></div>
						<EssaysAdd {...this.props} />
						<hr />
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		essaysReducer: state.EssaysReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callonListEssays: (subject) => {
			onListEssays(dispatch, subject);
		},
		calllistEssays: (subject, params={}, callback) => {
			dispatch(listEssays(subject, params, dispatch, callback));
		},
		callselectedEssay: (essay) => {
			dispatch(selectedEssay(essay));
		},
		callinitSelectedEssay: (subject, essay, past) => {
			dispatch(initSelectedEssay(dispatch, subject, essay, past));
		},
		callpostNewEssay: (subject, details, callback=null) => {
			dispatch(postNewEssay(subject, details, callback));
		},
		calldeleteEssay: (essay_id) => {
			dispatch(deleteEssay(essay_id));
		},
		calladdUpdateIssue: (essay_id, subject, details, callback=null) => {
			dispatch(addUpdateIssue(essay_id, subject, details, callback));
		},
		calllistIssues: (essay_id) => {
			dispatch(listIssues(essay_id));
		},
		calldeleteIssue: (essay_id, issue_id) => {
			dispatch(deleteIssue(essay_id, issue_id));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Essays);