import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App'
import LoginPage from './Containers/LoginPage/LoginPage';
import * as serviceWorker from './serviceWorker';
import ProgramPage from './Containers/ProgramPage/ProgramPage';
import CoursePage from './Containers/CoursePage/CoursePage';

ReactDOM.render(<ProgramPage name="Teknik Informatika"/>, document.getElementById('root'));
// ReactDOM.render(<CoursePage permission={2} id={1}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
