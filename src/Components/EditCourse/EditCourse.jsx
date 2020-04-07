import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'
import './EditCourse.css';

function EditCourse(props) {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    console.log(props.id);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const editCourse = () => {
        const api = process.env.REACT_APP_API_HOST + '/courses/edit/' + props.id;
        axios.patch(api, {"name": name, "code": code, "description": description},
        {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }
        ).then(function() {
            window.location.reload();
        })
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
                            <Form.Control type="name" placeholder="Enter course name" onChange={handleChangeName}/>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="code" placeholder="Enter course code" onChange={handleChangeCode}/>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="description" placeholder="Enter course description" onChange={handleDescription}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="secondary">Cancel</Button>
                    <Button onClick={editCourse} variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCourse;