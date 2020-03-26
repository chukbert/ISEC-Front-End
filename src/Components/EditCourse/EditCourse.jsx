import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'
import './EditCourse.css';

function EditCourse(props) {
    const [name, setName] = useState(''); 

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const editCourse = () => {
        // const api = process.env.REACT_APP_API_HOST + '/courses/edit'
        // axios.post(api, {"name": name}).then(function() {
        //     window.location.reload();
        // })
    }
    
    return (
        <div className="edit-course" onClick={e => e.stopPropagation()}>
            <Modal {...props} centered>
                <Modal.Header>
                    <Modal.Title>
                        Edit Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-edit-course">
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
                    <Button onClick={props.onHide} variant="secondary">Cancel</Button>
                    <Button onClick={editCourse} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCourse;