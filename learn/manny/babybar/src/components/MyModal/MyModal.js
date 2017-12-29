import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';

class MyModal extends Component {
	render() {
		const {show, onClose, title, onDelete} = this.props;
		return (
			<Modal show={show} onHide={onClose()}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmation 2</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Delete Record For 
					{
						title && 
							<span>
								{title}
							</span> 
					} </h4>
					<p>Do you really want to delete this record? You wont be able to recover it later?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onDelete()}>Delete Record</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default MyModal;