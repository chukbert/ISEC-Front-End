import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './NavbarApp.css';
import ProgramPage from '../../Containers/ProgramPage/ProgramPage';
import CoursePage from '../../Containers/CoursePage/CoursePage';

function NavbarApp(props) {
    // eslint-disable-next-line no-unused-vars
    const logout = () => {
        Cookies.remove('token');
        window.location.href='/';
    }

    const toProgram = () => {
        window.location.href = '/programs';
    }
    
    return (
        <div className="navbar">
            <Router>
                <Navbar fixed="top" expand="lg">
                    <div className="app-name">
                        <Navbar.Brand href="/">ISEC</Navbar.Brand>
                    </div>
                    <Nav className="mr-auto">
                        <Nav.Link>Courses</Nav.Link>
                        <Nav.Link onClick={toProgram}>Programs</Nav.Link>
                    </Nav>
                    <NavDropdown title="User" id="nav-dropdown">
                        <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>

                <Switch>
                    <Route path="/programs">
                        <ProgramPage id="5e7cd0babe742b001dbfaf83" permission={props.permission}/>
                    </Route>
                    <Route path="/courses">
                        <CoursePage permission={2} id={1} permission={props.permission}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default NavbarApp;
