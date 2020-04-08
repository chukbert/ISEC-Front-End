import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'
import './EditPrerequisite.css';

function EditPrerequisite(props) {
    const [code, setCode] = useState('');
    const [prerequisite, setPrerequisite] = useState('');

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    const handlePrerequisite = (e) => {
        setPrerequisite(e.target.value);
    }

    const editPrerequisite = () => {
        var arrPrerequisite = prerequisite.split(',');
        const api = process.env.REACT_APP_API_HOST + '/programs/setprereq/' + props.id;
        axios.patch(api, {"course": code, "prerequisite": arrPrerequisite}, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(function() {
            window.location.reload();
        })
    }
    
    return (
        <div className="add-course" onClick={e => e.stopPropagation()}>
            <Modal {...props} centered>
                <Modal.Header>
                    <Modal.Title>
                        Edit Prerequisite
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-add-course">
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control type="code" placeholder="Enter course code" onChange={handleChangeCode}/>
                            <Form.Label>Prerequisite</Form.Label>
                            <Form.Control type="prerequisite" placeholder="Enter prerequisite code" onChange={handlePrerequisite}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="secondary">Cancel</Button>
                    <Button onClick={editPrerequisite} variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditPrerequisite;