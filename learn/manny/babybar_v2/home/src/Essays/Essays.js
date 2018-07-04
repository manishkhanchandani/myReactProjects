import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listEssays, postNewEssay, deleteEssay, addUpdateIssue, listIssues, deleteIssue} from './Essays.Action.js';
import {subjects} from '../utilities/functions.js';

class Essays extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			
		};
	}
	
	componentDidMount() {
		
	}

	render() {
		console.log(this.props);
		const subject = this.props.match.params.subject;
		if (!subject) {
			return null;	
		}
		const subjectDetails = subjects[subject];

		return (
			<div>
				<h3>Essays : {subjectDetails.name}</h3>
				<div className="row">
					<div className="col-md-4">
						<hr />
						<div><b>Change Subject</b></div>
						
						<hr />
						<div><b>Choose Essay</b></div>
						
						<hr />
						<div><b>Add New Essay</b></div>
						
						<hr />
					</div>
					<div className="col-md-4">
					</div>
					<div className="col-md-4">
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
		calllistEssays: (name) => {
			dispatch(listEssays(name));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Essays);