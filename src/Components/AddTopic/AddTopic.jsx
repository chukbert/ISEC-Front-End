import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'
import './AddTopic.css';

function AddTopic(props) {
    const [name, setName] = useState(''); 

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const createNewTopic = () => {
        const api = process.env.REACT_APP_API_HOST + 'courses/topics/' + props.id;
        axios.post(api, {"name": name},  {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(function() {
            // console.log("SUCC");
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
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="name" placeholder="Enter topic title" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="secondary">Cancel</Button>
                    <Button onClick={createNewTopic} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTopic;