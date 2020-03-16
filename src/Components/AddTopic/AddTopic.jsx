import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import './AddTopic.css';

function AddTopic(props) {
    return (
        <div className="add-topic">
            <Modal showOverlay={false} centered>
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
                    <Button>Cancel</Button>
                    <Button btnStyle="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}