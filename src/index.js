import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App'
import LoginPage from './Containers/LoginPage/LoginPage';
import * as serviceWorker from './serviceWorker';
import ProgramPage from './Containers/ProgramPage/ProgramPage';
import CoursePage from './Containers/CoursePage/CoursePage';
import RegisterPage from './Containers/RegisterPage/RegisterPage';
import RegisterLoginPage from './Containers/RegisterLoginPage/RegisterLoginPage';

ReactDOM.render(<LoginPage />, document.getElementById('root'));
// ReactDOM.render(<RegisterPage />, document.getElementById('root'));
// ReactDOM.render(<RegisterLoginPage />, document.getElementById('root'));

// ReactDOM.render(<ProgramPage id="5e7cd0babe742b001dbfaf83" permission={2}/>, document.getElementById('root'));
// ReactDOM.render(<CoursePage permission={2} id={1}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
