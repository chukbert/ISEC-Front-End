import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios';
import './EditTopic.css';

function EditTopic(props) {
    const [name, setName] = useState(''); 

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const editTopic = () => {
        const api = process.env.REACT_APP_API_HOST + '/topics/edit/' + props.id;
        axios.patch(api, {"name": name}).then(function() {
            window.location.reload();
        })
    }

    return (
        <div className="edit-topic" onClick={e => e.stopPropagation()}>
            <Modal {...props} centered>
                <Modal.Header>
                    <Modal.Title>
                        Edit Topic
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-edit-topic">
                            <Form.Label>Topic Title</Form.Label>
                            <Form.Control type="name" placeholder="Enter topic title" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} btnStyle="primary">Cancel</Button>
                    <Button onClick={editTopic} btnStyle="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditTopic;