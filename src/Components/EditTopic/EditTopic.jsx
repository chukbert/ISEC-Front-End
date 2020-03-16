import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import './AddTopic.css';

function AddTopic(props) {
    return (
        <div className="add-topic">
            <Modal centered>
                <Modal.Header>
                    <Modal.Title>
                        Edit Topic
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-add-topic">
                            <Form.Label>Topic Title</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Cancel</Button>
                    <Button btnStyle="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}