import React, {Component} from 'react';
import {connect} from 'react-redux';
import renderHTML from 'react-render-html';

import {getUsersObj} from '../auth/AuthAction.js';
import {Redirect} from 'react-router-dom';
import Arson from './criminal/arson.js';
import Burglary from './criminal/burglary.js';

const pages = {
	criminal: {
		arson: <Arson />,
		burglary: <Burglary />	
	}
};

class PractiseQuestion extends Component {
	
	render() {
		let userObj = getUsersObj();
		if (!(userObj.access_level === 'admin' || userObj.access_level === 'admin2' || userObj.access_level === 'superadmin')) {
			return <Redirect to="/" push={true} />
		}
		if (!pages[this.props.match.params.subject]) return null;
		if (!pages[this.props.match.params.subject][this.props.match.params.issue]) return null;
		const page = pages[this.props.match.params.subject][this.props.match.params.issue];
		return (
			<div>
				<div className="row">
					<div className="col-md-8">
						{page}
					</div>
					
					
					
					<div className="col-md-4">
						{this.props.practiseReducer.practice_question_result && 
							<div>
								<h3>Solution</h3>
								{renderHTML(this.props.practiseReducer.practice_question_result)}
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
		practiseReducer: state.PractiseReducer
	}	
};

export default connect(mapStateToProps)(PractiseQuestion);