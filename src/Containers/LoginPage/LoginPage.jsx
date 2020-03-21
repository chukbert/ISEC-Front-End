import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './LoginPage.css';

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            permission: 0,
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleSubmit() {
        const api = '';
        axios.post(api, {
            username: this.state.username,
            password: this.state.password
        }).then(() => {
            // TBD
        })
    }

    render() {
        return (
            <div className="login-page">
                <Form>
                    <Form.Group controlId="loginUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </Form>
            </div>
        )
    }
}

export default LoginPage;