import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import renderHTML from 'react-render-html';

//<ShowModal show={true/false} onClose={fn} Title=`My Title` Body=`My Body` Footer=`My Footer` />
class ShowModal extends Component {
	hideMe() {
		this.props.onClose();	
	}
	render() {
		const {show, Title, Body, Footer} = this.props;
		return (
			<Modal show={show} onHide={this.hideMe.bind(this)}>
				<Modal.Header closeButton>
					<Modal.Title>{Title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{renderHTML(Body)}
				</Modal.Body>
				<Modal.Footer>
					{Footer}
				</Modal.Footer>
			</Modal>
		);
	}
}

export default ShowModal;