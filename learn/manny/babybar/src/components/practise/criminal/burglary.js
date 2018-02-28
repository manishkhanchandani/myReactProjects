import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {setPractiseQuestionResult, clearP} from '../practiseAction.js';


class Burglary extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			template: 0,
			solution: 0,
			result: '',
			story: '',
			breaking: '',
			entering: '',
			dwelling: '',
			nighttime: '',
			intent_felony: '',
			anyStructure: '',
			anyTime: '',
			trespassoryEntry: '',
			name: '',
			modernLaw: true,
			commonLaw: true,
			def: "Under COMMON LAW a BURGLARY was the <b>breaking</b> and <b>entering</b> of the <b>dwelling of another</b> in the <b>nighttime</b> with <b>intent to commit a felony</b>.<br /><br />Further, a <b>CONSTRUCTIVE BREAKING</b> would be found if entry was made by trick, threat of violence, or with the help of conspirator.<br /><br />MODERNLY burglary has been extended to almost any structure and all times of the day. If a larceny is not felony, it still supports a charge of burglary. And modernly a constructive breaking will be found if there is any TRESPASSORY ENTRY, an entry without permission, express or implied.",
			templates: [
				{
					story: "Jim like sue, a girl in the class of Jim. But Sue loves Chester. Jim thought that Sue would dump Chester for him if he was a hero. So Jim set fire to the wastepaper basket in old-lady Smith's classroom during the class break intending to report it and be a hero. He didn't intend any harm to the building, and he honestly believed the fire would not hurt the school at all. Unfortunately, the fire slightly singed the wall, and some other boys poured water on it before Jim could report it.",
					breaking: '',
					entering: '',
					dwelling: '',
					nighttime: '',
					intent_felony: '',
					anyStructure: '',
					anyTime: '',
					trespassoryEntry: '',
					modernLaw: true,
					commonLaw: false,
					name: 'they',
					solution: 0
				}
			],//end templates						
			solutions: [
				(record) => {
					let res = '';
					res = res + `${record.def}<br /><br />`;

					if (record.modernLaw && record.commonLaw) {
						res = res + `Therefore ${record.name} could be charged with burglary modernly and also could have been charged at common law.`;
					} else if (record.modernLaw && !record.commonLaw) {
						res = res + `Therefore ${record.name} could be charged with burglary modernly but could not have been charged at common law.`;
					} else if (!record.modernLaw && record.commonLaw) {
						res = res + `Therefore ${record.name} could not be charged with burglary modernly but could have been charged at common law.`;
					}
					return res;
				}	   
			]//end solutions
		};
	}
	
	
	
	submitForm(e) {
		e.preventDefault();
		this.setState({
			breaking: clearP(this.refs.breaking.state.value),
			entering: clearP(this.refs.entering.state.value),
			dwelling: clearP(this.refs.dwelling.state.value),
			nighttime: clearP(this.refs.nighttime.state.value),
			intent_felony: clearP(this.refs.intent_felony.state.value),
			anyStructure: clearP(this.refs.anyStructure.state.value),
			anyTime: clearP(this.refs.anyTime.state.value),
			trespassoryEntry: clearP(this.refs.trespassoryEntry.state.value),
			name: '',
			modernLaw: true,
			commonLaw: true
			}, () => {
			let result = this.state.solutions[this.state.solution](this.state);
			this.props.callPractiseQuestionResult(result);
		});
		window.scrollTo(0, 0);
	}

	
	changeState(template) {
		this.setState({
			template: template,
			story: this.state.templates[template].story,
			breaking: this.state.templates[template].breaking,
			entering: this.state.templates[template].entering,
			dwelling: this.state.templates[template].dwelling,
			nighttime: this.state.templates[template].nighttime,
			intent_felony: this.state.templates[template].intent_felony,
			anyStructure: this.state.templates[template].anyStructure,
			anyTime: this.state.templates[template].anyTime,
			trespassoryEntry: this.state.templates[template].trespassoryEntry,
			name: this.state.templates[template].name,
			modernLaw: this.state.templates[template].modernLaw,
			commonLaw: this.state.templates[template].commonLaw
			}, () => {
				
			let result = this.state.solutions[this.state.solution](this.state);
			this.props.callPractiseQuestionResult(result);
		});	
		
	}
	
	componentDidMount() {
		this.setState({
			story: this.state.templates[this.state.template].story,
			breaking: this.state.templates[this.state.template].breaking,
			entering: this.state.templates[this.state.template].entering,
			dwelling: this.state.templates[this.state.template].dwelling,
			nighttime: this.state.templates[this.state.template].nighttime,
			intent_felony: this.state.templates[this.state.template].intent_felony,
			anyStructure: this.state.templates[this.state.template].anyStructure,
			anyTime: this.state.templates[this.state.template].anyTime,
			trespassoryEntry: this.state.templates[this.state.template].trespassoryEntry,
			name: this.state.templates[this.state.template].name,
			modernLaw: this.state.templates[this.state.template].modernLaw,
			commonLaw: this.state.templates[this.state.template].commonLaw
			}, () => {
			let result = this.state.solutions[this.state.solution](this.state);
			this.props.callPractiseQuestionResult(result);
		});	
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12"><h3>Criminal : Burglary</h3></div>
				</div>
				<div className="form-group mySpacing">
					<label>Choose Template</label>
					{
						this.state.templates && 
						<select className="form-control" value={this.state.template} onChange={(e) => { this.changeState(e.target.value); }}>
							{
								this.state.templates.map((value, key) => {
									return <option value={key} key={key}>Template {key + 1}</option>
								})
							}
						</select>
					}
				</div>
				<form onSubmit={this.submitForm.bind(this)}>
					<div className="form-group">
						<label>Story</label>
						<textarea rows="10" value={this.state.story} className="form-control" placeholder="Enter Story" onChange={(e) => { this.setState({story: e.target.value});}} />
					</div>
					<div className="form-group">
						<label>Name of Criminal</label>
						<input type="text" value={this.state.name} className="form-control" placeholder="Enter Name of Criminal" onChange={(e) => { this.setState({name: e.target.value});}} />
					</div>
					<div className="form-group">
						<label>Element 1: Breaking</label>
						<ReactQuill theme="snow" ref="breaking" value={this.state.breaking} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 2: Entering</label>
						<ReactQuill theme="snow" ref="entering" value={this.state.entering} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 3: Dwelling of Another</label>
						<ReactQuill theme="snow" ref="dwelling" value={this.state.dwelling} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 4: Night Time</label>
						<ReactQuill theme="snow" ref="nighttime" value={this.state.nighttime} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 5: Intent To Commit a Felony</label>
						<ReactQuill theme="snow" ref="intent_felony" value={this.state.intent_felony} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 6: Modernly Any Structure</label>
						<ReactQuill theme="snow" ref="anyStructure" value={this.state.anyStructure} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 7: Modernly Any Time</label>
						<ReactQuill theme="snow" ref="anyTime" value={this.state.anyTime} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 8: Modernly Trespassory Entry</label>
						<ReactQuill theme="snow" ref="trespassoryEntry" value={this.state.trespassoryEntry} placeholder="Enter Text" className="rulebox" modules={{
	toolbar: [
	['bold', 'italic', 'underline']
	],
	}} />
					</div>
					<div className="form-group">
						<label>Element 9: Modern Law / Common Law</label><br />
						<input type="checkbox" value={this.state.modernLaw} onChange={(e) => this.setState({modernLaw: e.target.value})} /> Modern Law <input type="checkbox" value={this.state.commonLaw} onChange={(e) => this.setState({commonLaw: e.target.value})} /> Common Law
					</div>
					
					<br />
					<button type="submit" className="btn btn-primary form-control">Create Essay Result</button>
				</form>	
			</div>
		);	
	}
}

const mapStateToProps = (state) => {
	return {
		practiseReducer: state.PractiseReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callPractiseQuestionResult: (result) => {
			dispatch(setPractiseQuestionResult(result));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Burglary);