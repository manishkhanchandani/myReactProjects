import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button} from 'react-bootstrap';
import renderHTML from 'react-render-html';
import {getUID} from '../auth/AuthAction.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {withRouter} from 'react-router';
import {dynamicSort, timeAgo} from '../../utilities/functions.js';

class LearnRule extends Component {
	constructor(props) {
		super(props);
		
		this.state = { editorHtml: '', mountedEditor: false, data: null }
		this.quillRef = null;
		this.reactQuillRef = null;
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.attachQuillRefs = this.attachQuillRefs.bind(this);
		let uid = getUID();
		let uidPath = '/' + uid;
		let subject = '/' + this.props.match.params.subject;
		let issue = '/' + this.props.match.params.issue;
		this.refUrl = FirebaseConstant.basePath + '/practice/rules' + uidPath + subject + issue;
		this.refUrlRef = firebaseDatabase.ref(this.refUrl);
	}

	componentDidMount () {
    	this.attachQuillRefs();
		
		this.refUrlRef.limitToLast(10).off();
		this.refUrlRef.limitToLast(10).on('value', (snapshot) => {
			let records = snapshot.val();
			if (!records) {
				this.setState({data: null});	
			}
			
			var myArray = [];
			for (var key in records) {
				var obj = records[key];
				obj.dt = timeAgo(obj.created_dt);
				obj._id = key;
				myArray.push(obj);
			}
			
			//sorting
			myArray.sort(dynamicSort('-created_dt'));
			this.setState({data: myArray});	
		});
  	}
  
  componentDidUpdate () {
    this.attachQuillRefs()
  }
  
  attachQuillRefs() {
    // Ensure React-Quill reference is available:
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;
    
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }
  
  handleClick () {
	  	if (!this.state.editorHtml) return;
		this.refUrlRef.push({created_dt:  firebase.database.ServerValue.TIMESTAMP, rule: this.state.editorHtml});
		this.quillRef.setContents('');
		this.setState({ editorHtml: '' });
  }
  
  handleChange (html) {
  	this.setState({ editorHtml: html });
  }
  
  componentWillUnmount() {
	  this.refUrlRef.limitToLast(10).off();
  }
 

	render() {
		return (
			<div>
			<div className="panel panel-primary">
				<div className="panel-heading">Practice Rules</div>
				<div className="panel-body">
					<div>
						<p>Type your rules multiple times here to practice and learn.</p>
						<ReactQuill theme={'snow'} onChange={this.handleChange} ref={(el) => { this.reactQuillRef = el }} defaultValue={this.state.editorHtml} placeholder="Put Your Rule" className="rulebox" modules={{
toolbar: [
  ['bold', 'italic', 'underline']
],
}} />
						<br />
						<Button className="form-control" bsStyle="primary" onClick={this.handleClick}>Practice Rule</Button>
					</div>
				</div>
			</div>
			{
				this.state.data &&
				<div className="panel panel-primary">
					<div className="panel-heading">Practice Rules History</div>
					<div className="panel-body">
						{
							this.state.data.map((value, key) => {
								return 	<div key={key}><b>{value.dt}</b><br /><br />
									{renderHTML(value.rule)}
									<hr />
									</div>				 
							})
						}
						
					</div>
				</div>
			}
			
			</div>
		);
	}
}

export default withRouter(LearnRule);