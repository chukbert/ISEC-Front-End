import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'
import './AddCourse.css';

function AddCourse(props) {
    const [name, setName] = useState(''); 

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const createNewCourse = () => {
        // const api = process.env.REACT_APP_API_HOST + '/course/new'
        // axios.post(api, {"name": name}).then(function() {
        //     window.location.reload();
        // })
    }
    
    return (
        <div className="add-course" onClick={e => e.stopPropagation()}>
            <Modal {...props} centered>
                <Modal.Header>
                    <Modal.Title>
                        Add Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-add-course">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter course name" onChange={handleChange}/>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="name" placeholder="Enter course code" onChange={handleChange}/>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="name" placeholder="Enter course description" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} btnStyle="secondary">Cancel</Button>
                    <Button onClick={createNewCourse} btnStyle="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTopic;