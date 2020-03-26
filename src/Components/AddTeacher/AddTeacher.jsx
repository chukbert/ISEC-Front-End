import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'
import './AddTeacher.css';

function AddTeacher(props) {
    const [name, setName] = useState(''); 

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const addTeacherToProgram = () => {
        const api = process.env.REACT_APP_API_HOST + '/programs/teacher/' + props.id
        axios.post(api, {"username": name}).then(function() {
            window.location.reload();
        })
    }
    
    return (
        <div className="add-teacher" onClick={e => e.stopPropagation()}>
            <Modal {...props} centered>
                <Modal.Header>
                    <Modal.Title>
                        Add Teacher
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-add-course">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="name" placeholder="Enter username" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="secondary">Cancel</Button>
                    <Button onClick={addTeacherToProgram} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTeacher;