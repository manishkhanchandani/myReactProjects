import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';

class DeleteModal extends Component {
	render() {
		const {deleteModal, closeFn, message, deleteRecordFn, details} = this.props;
		return (
			<Modal show={deleteModal} onHide={closeFn.bind(this)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Delete Record For 
					{
						message && 
							<span> {message}</span> 
					} </h4>
					<p>Do you really want to delete this record? You wont be able to recover it later?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={deleteRecordFn.bind(this, details)}>Delete Record</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DeleteModal;