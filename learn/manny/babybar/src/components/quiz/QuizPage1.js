import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import * as quizActions from './QuizAction.js';

class QuizPage1 extends Component {
	render() {
		const pageData = this.props.data;
		const uid = this.props.uid;
		return (
			<div>
				<div className="panel panel-primary">
				  <div className="panel-heading text-center">
					<h3 className="panel-title">Challangers {pageData.user1_creator} v/s {pageData.user2_creator}</h3>
				  </div>
				  <div className="panel-body">
					
					
					<div className="row">
						<div className="col-md-5 text-center">
							<div className="panel panel-default">
							  <div className="panel-heading">
								<h3 className="panel-title">{pageData.user1_creator}</h3>
							  </div>
							  <div className="panel-body">
								<img alt={pageData.user1_creator} className="img-responsive" src={pageData.user1_photoURL} />
								{pageData.user1_status}
								{
									(uid === pageData.user1_uid && pageData.user1_status === 'Pending') &&
									<Button bsStyle="primary" onClick={() => {this.props.callChangeUser1Status(pageData.id, 'Ready'); this.props.callChangeQuizDetailsUser1(pageData.id, 'question', pageData.questions[0]); this.props.callChangeQuizDetails(pageData.id, 'question', pageData.questions[0]);}} className="form-control">Are you Ready ?</Button>
								}
							  </div>
							  <div className="panel-footer"><b>UID: </b>{pageData.user1_uid}</div>
							</div>
							
						</div>
						<div className="col-md-2 text-center">
							V / S
							
						</div>
						<div className="col-md-5 text-center">
							<div className="panel panel-default">
							  <div className="panel-heading">
								<h3 className="panel-title">{pageData.user2_creator}</h3>
							  </div>
							  <div className="panel-body">
								<img alt={pageData.user2_creator} className="img-responsive" src={pageData.user2_photoURL} />
								{pageData.user2_status}
								{
									(uid === pageData.user2_uid && pageData.user2_status === 'Pending') &&
									<Button bsStyle="primary" onClick={() => {this.props.callChangeUser2Status(pageData.id, 'Ready'); this.props.callChangeQuizDetailsUser2(pageData.id, 'question', pageData.questions[0]); this.props.callChangeQuizDetailsUser2(pageData.id, 'question', pageData.questions[0]); this.props.callChangeQuizDetails(pageData.id, 'question', pageData.questions[0]);}} className="form-control">Are you Ready?</Button>
								}
								
							  </div>
							  <div className="panel-footer"><b>UID: </b>{pageData.user2_uid}</div>
							</div>
							
						</div>
					</div>
					
					
					
				  </div>
				  
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		quizReducer: state.QuizReducer
	}
};


const mapDispatchToProps = (dispatch) => {
	return {
		callChangeUser1Status: (id, status) => {
			quizActions.changeUser1Status(id, status);	
		},
		callChangeUser2Status: (id, status) => {
			quizActions.changeUser2Status(id, status);	
		},
		callChangeQuizDetailsUser1: (id, key, value) => {
			quizActions.changeQuizDetailsUser1(id, key, value);	
		},
		callChangeQuizDetailsUser2: (id, key, value) => {
			quizActions.changeQuizDetailsUser2(id, key, value);	
		},
		callChangeQuizDetails: (id, key, value) => {
			quizActions.changeQuizDetails(id, key, value);	
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage1);