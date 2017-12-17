import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import * as quizActions from './QuizAction.js';

class QuizShowDelete extends Component {
	
	deleteRecord() {
		if (!this.props.quizReducer.currentRecord || !this.props.quizReducer.currentRecord.id) {
			return;	
		}
		
		this.props.callDeleteRecord(this.props.quizReducer.currentRecord.id);
	}
	

	render() {
		return (
			<Modal show={this.props.quizReducer.showModal} onHide={this.props.callClose.bind(this)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Delete Record with ID: {this.props.quizReducer.currentRecord && this.props.quizReducer.currentRecord.id} </h4>
					<p>Do you really want to delete this record? You wont be able to recover it later?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.deleteRecord.bind(this)}>Delete Record</Button>
				</Modal.Footer>
			</Modal>
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
		callCreateQuiz: (topic) => {
			dispatch(quizActions.createQuiz(topic));
		},
		callListQuiz: () => {
			dispatch(quizActions.listQuiz(dispatch));	
		},
		callOpen: (rec) => {
			dispatch(quizActions.open(rec));	
		},
		callClose: () => {
			dispatch(quizActions.close());	
		},
		callDeleteRecord: (id) => {
			dispatch(quizActions.deleteRecord(id));	
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizShowDelete);