import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {onListEssays, listEssays, selectedEssay, postNewEssay, deleteEssay, addUpdateIssue, listIssues, deleteIssue} from './Essays.Action.js';
import {subjects, updateLoggedInTime} from '../utilities/functions.js';
import './Essays.css';
import {getUsersObj} from '../auth/AuthAction.js';
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
		this.state = { text: '', title: '' } // You can also pass a Quill Delta here
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
		this.props.callpostNewEssay(obj, (id) => {
			this.setState({text: '', title: ''});
			//this.props.calllistEssays(this.props.match.params.subject, {id: id});
			
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
				<br />
				<br />
				<Button className="form-control" bsStyle="primary" onClick={this.addNewEssay.bind(this)}>Add New Essay</Button>
			</div>		
		);	
	}
}

class Essays extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			subject: null,
			id: null
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
		updateLoggedInTime();
	}
	
	componentWillReceiveProps(nextProps) {
		if (!(this.state.subject === nextProps.match.params.subject && this.state.id === nextProps.match.params.id) && nextProps.essaysReducer.list_essay && nextProps.match.params.id && nextProps.match.params.subject) {
			this.setState({subject: nextProps.match.params.subject, id: nextProps.match.params.id});
			this.fetchParticular(nextProps.match.params.id, nextProps.essaysReducer.list_essay);
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

		return (
			<div className="page-essay">
				<h3>Essays : {subjectDetails.name}</h3>
				<div className="row">
					<div className="col-md-5">
						{
							this.props.essaysReducer.selected_essay && 
							<div>
								<h3>{this.props.essaysReducer.selected_essay.title}</h3>
								<div className="essay">
									{renderHTML(this.props.essaysReducer.selected_essay.essay)}

								</div>
							</div>
						}
					</div>
					<div className="col-md-4">
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
		callpostNewEssay: (details, callback=null) => {
			dispatch(postNewEssay(details, callback));
		},
		calldeleteEssay: (essay_id) => {
			dispatch(deleteEssay(essay_id));
		},
		calladdUpdateIssue: (essay_id, details) => {
			dispatch(addUpdateIssue(essay_id, details));
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