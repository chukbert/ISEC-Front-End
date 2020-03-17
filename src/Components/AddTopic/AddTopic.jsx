import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import './AddTopic.css';

function AddTopic(props) {
    
    return (
        <div className="add-topic" onClick={e => e.stopPropagation()}>
            <Modal {...props} centered>
                <Modal.Header>
                    <Modal.Title>
                        Add Topic
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-add-topic">
                            <Form.Label>Topic Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter topic title" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} btnStyle="primary">Cancel</Button>
                    <Button onClick={props.onHide} btnStyle="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTopic;