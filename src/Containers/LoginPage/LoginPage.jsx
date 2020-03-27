import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button } from 'react-bootstrap';
import './LoginPage.css';

// import ProgramPage from '../ProgramPage/ProgramPage';
import Home from '../Home/Home';

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            permission: 0,
            username: '',
            password: '',
            isTokenValid: false,
            isError: false,
            isSubmit: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkToken = this.checkToken.bind(this)
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const api = process.env.REACT_APP_API_HOST + '/users/login';

        try{
            const response = await axios.post(api, {
                username: this.state.username,
                password: this.state.password,
            })

            if (response.data.success) {
                Cookies.set('token', response.data.token)
                this.checkToken();
                this.setState({
                    isSubmit: true
                })
            } else {
                this.setState({
                    isError: true
                })
            }
        } catch (err) {
            this.setState({
                isError: true
            })
        }   
    }

    checkToken = async () => {
        const api = process.env.REACT_APP_API_HOST + '/users/auth'
        try {
            const response = await axios.post(api, {}, {
                headers: {
                    "Authorization": `${Cookies.get('token')}`
                }
            })

            if (response.data.success) {
                this.setState({
                    username: response.data.username,
                    permission: response.data.role,
                    isTokenValid: true,
                })
            } else {
                this.setState({
                    isTokenValid: false,
                })
                Cookies.remove('token');
            }
        } catch (err) {
            this.setState({
                isTokenValid: false
            })
        }
    }

    componentDidMount() {
        const api = process.env.REACT_APP_API_HOST + '/users/auth';
        axios.post(api, {}, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(response => {
            if (response.data.success) {
                this.setState({
                    username: response.data.username,
                    permission: response.data.role,
                    isTokenValid: true,
                })
            } else {
                this.setState({
                    isTokenValid: false,
                })
                Cookies.remove('token');
            }
        })
    }

    render() {
        if (Cookies.get('token')){
            if (this.state.isTokenValid) {
                return (
                    <Home permission={this.state.permission} />
                )
            } else {
                this.checkToken();
                return null
            }
        } else {
            return (
                <div className="login-page">
                    <Form>
                        <Form.Group controlId="loginUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" type="username" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                            Log in
                        </Button>
                        {
                            this.state.isError &&
                            <span>ERROR</span>
                        }
                    </Form>
                </div>
            )
        }
    }
}

export default LoginPage;