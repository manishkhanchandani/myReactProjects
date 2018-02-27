import React, {Component} from 'react';
import renderHTML from 'react-render-html';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Arson extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			template: 0,
			story: '',
			cause: '',
			malice: '',
			wrongful: '',
			name: '',
			solution: 0,
			result: '',
			def: "Under common law ARSON was the <b>malicious burning</b> of the <b>dwelling</b> of <b>another</b>.<br /><br />MODERNLY arson is extended by statute to the burning of <b>other structures</b>. Malice for arson means that the <b>burning</b> must be done with <b>wrongful intent</b>.",
			templates: [
				{
					story: "Jim like sue, a girl in the class of Jim. But Sue loves Chester. Jim thought that Sue would dump Chester for him if he was a hero. So Jim set fire to the wastepaper basket in old-lady Smith's classroom during the class break intending to report it and be a hero. He didn't intend any harm to the building, and he honestly believed the fire would not hurt the school at all. Unfortunately, the fire slightly singed the wall, and some other boys poured water on it before Jim could report it.",
					cause: 'the "wall" of the school "classroom" was singed.',
					malice: 'he acted with the <b>wrongful intent</b> of setting the fire to make himself look like a "hero".',
					wrongful: 'he did it to disrupt the school and knowing it would damage the school\'s wastepaper basket.',
					name: 'Jim',
					solution: 0
				},
				{
					story: "Bob told Anna that he knew someone who would handle burning the warehouse in return for a percentage of the insurance proceeds. Anna agreed and Bob contacted Cindy to burn down the warehouse. Cindy obtained the location of the warehouse from Bob and proceeded to set fire to the warehouse. Unbeknownst to Anna, Bob or Cindy, a homeless person, Daryll, was living in the warehouse. Daryll died as a result of the fire.",
					cause: ' it was significant enough to cause Daryll\'s death.',
					malice: 'Anna also burned her own property (business inventory) and the burning is supposed to be of another\'s property. However if one commits arson with the intention of collecting insurance money then this qualifies as arson because Anna did so for illegal purposes. ',
					wrongful: ' as Anna and Bob conspired to have it burned down by asking Cindy to burn it down for a percentage of the insurance proceeds.',
					name: 'Cindy',
					solution: 0
				}
			],
			solutions: [
				(def, name, cause, malice, wrongful) => {
					return `${def}<br /><br />Here ${name} caused a <b>burning</b> of a <b>structure</b> because ${cause}<br /><br />Here ${name} acted with <b>malice</b> because ${malice}<br /><br />This was <b>wrongful</b> because ${wrongful}<br /><br />Therefore, ${name} can be charged with arson.`;	
				}	   
			]
		};
	}
	
	componentDidMount() {
		this.setState({story: this.state.templates[this.state.template].story,
			cause: this.state.templates[this.state.template].cause,
			malice: this.state.templates[this.state.template].malice,
			wrongful: this.state.templates[this.state.template].wrongful,
			name: this.state.templates[this.state.template].name}, () => {
				
			let result = this.state.solutions[this.state.solution](this.state.def, this.state.name, this.state.cause, this.state.malice, this.state.wrongful);
			this.setState({result: result});		
		});	
	}
	
	changeState(template) {
		this.setState({template: template, story: this.state.templates[template].story,
			cause: this.state.templates[template].cause,
			malice: this.state.templates[template].malice,
			wrongful: this.state.templates[template].wrongful,
			name: this.state.templates[template].name}, () => {
				
			let result = this.state.solutions[this.state.solution](this.state.def, this.state.name, this.state.cause, this.state.malice, this.state.wrongful);
			this.setState({result: result});		
		});	
		
	}
	
	submitForm(e) {
		e.preventDefault();
		this.setState({cause: this.refs.cause.state.value.replace(/(<p[^>]+?>|<p>|<\/p>)/img, ""), malice: this.refs.malice.state.value.replace(/(<p[^>]+?>|<p>|<\/p>)/img, ""), wrongful: this.refs.wrongful.state.value.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "")}, () => {
			let result = this.state.solutions[this.state.solution](this.state.def, this.state.name, this.state.cause, this.state.malice, this.state.wrongful);
			this.setState({result: result});
		});
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12"><h3>Criminal : Arson</h3></div>
				</div>
				<div className="row">
					<div className="col-md-8">
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
								<label>Element 1: Cause of Arson</label>
								<ReactQuill theme="snow" ref="cause" value={this.state.cause} placeholder="Enter Cause" className="rulebox" modules={{
    toolbar: [
      ['bold', 'italic', 'underline']
    ],
  }} />
							</div>
							<div className="form-group">
								<label>Element 2: Malice About Arson</label>
								<ReactQuill theme="snow" ref="malice" value={this.state.malice} placeholder="Enter Malice" className="rulebox" modules={{
    toolbar: [
      ['bold', 'italic', 'underline']
    ],
  }} />
							</div>
							<div className="form-group">
								<label>Element 3: Wronful Arson</label>
								<ReactQuill theme="snow" ref="wrongful" value={this.state.wrongful} placeholder="Enter Wrongful" className="rulebox" modules={{
    toolbar: [
      ['bold', 'italic', 'underline']
    ],
  }} />
							</div><br />
						  	<button type="submit" className="btn btn-primary form-control">Create Essay Result</button>
						</form>
					</div>
					
					
					
					<div className="col-md-4">
						{this.state.result && 
							<div>
								<h3>Solution</h3>
								{renderHTML(this.state.result)}
							</div>
						}
					</div>
					
				
					
					
				</div>
			</div>
		);
	}
}

export default Arson;