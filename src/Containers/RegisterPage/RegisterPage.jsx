import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button } from 'react-bootstrap';
import './RegisterPage.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import ProgramPage from '../ProgramPage/ProgramPage';
import Home from '../Home/Home';
import LoginPage from '../LoginPage/LoginPage';

class RegisterPage extends React.Component {
    constructor() {
        super();
        this.state = {
            permission: 0,
            username: '',
            email: '',
            password: '',
            role: 0,
            isTokenValid: false,
            isError: false,
            isSubmit: false,
            isLogin: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkToken = this.checkToken.bind(this)
        this.changeLoginPage = this.changeLoginPage.bind(this)
    }

    handleChange(e) {
        let value = e.target.value;
        if (e.target.name === "role") 
        {
            value = parseInt(value, 10);
        }
        this.setState({
            [e.target.name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const api = process.env.REACT_APP_API_HOST + '/users/register';

        try{
            const response = await axios.post(api, {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
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

    changeLoginPage() {
        this.setState({ isLogin: true });
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
            if (!this.state.isLogin) {
                return (
                    <div className="register-page">
                        <Form>
                            <Form.Group controlId="registerUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" type="username" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="registerEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="registerPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="registerRole">
                                <Form.Label>Role</Form.Label>
                                <form onSubmit={this.handleFormSubmit}>
                                <div className="radio">
                                    <label>
                                    <input name="role" type="radio" value="0" checked={this.state.role === 0} onChange={this.handleChange} />
                                    Student
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                    <input name="role" type="radio" value="1" checked={this.state.role === 1} onChange={this.handleChange} />
                                    Teacher
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                    <input name="role" type="radio" value="2" checked={this.state.role === 2} onChange={this.handleChange} />
                                    Admin
                                    </label>
                                </div>
                                </form>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                Sing Up
                            </Button>
                            {
                                this.state.isError &&
                                <span>ERROR</span>
                            }
                            <p className="link-login" onClick={this.changeLoginPage}>Already have an account? Sign in here</p>
                        </Form>
                    </div>
                    
                )
            } else {
                return (
                    <LoginPage/>
                )
            }
        }
    }
}

export default RegisterPage;