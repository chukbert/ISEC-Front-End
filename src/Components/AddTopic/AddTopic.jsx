import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'
import './AddTopic.css';

function AddTopic(props) {
    const [name, setName] = useState(''); 

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const createNewTopic = () => {
        const api = process.env.REACT_APP_API_HOST + '/topics/new'
        axios.post(api, {"name": name}).then(function() {
            window.location.reload();
        })
    }
    
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
                            <Form.Control type="name" placeholder="Enter topic title" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} btnStyle="primary">Cancel</Button>
                    <Button onClick={createNewTopic} btnStyle="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTopic;