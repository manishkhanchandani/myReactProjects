import React, {Component} from 'react';
//https://github.com/zenoamaro/react-quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './TextEditor.css';

class TextEditor extends Component {
	
	constructor(props) {
		super(props);	
		
		this.state = {
			text: 'random value'
		};
	}
	
	handleChange (html) {
		this.setState({ text: html });
	}
	
	submitRec() {
	}
	
	render() {
		return (
			<div>
				<ReactQuill theme="snow" onChange={this.handleChange.bind(this)} value={this.state.text} placeholder="Add your text here" className="textbox" modules={{
					toolbar: [
					  ['bold', 'italic', 'underline']
					],
				  }} />
				<Button className="form-control" bsStyle="primary" onClick={this.submitRec.bind(this)}>Add Record</Button>
			</div>
		);
	}
}

export default TextEditor;