import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './NavbarApp.css';

function NavbarApp() {
    // eslint-disable-next-line no-unused-vars
    return (
        <div className="navbar">
            <Navbar fixed="top" expand="lg">
                <div className="app-name">
                    <Navbar.Brand href="#">ISEC</Navbar.Brand>
                </div>
                <Nav className="mr-auto">
                    <Nav.Link href="#">Courses</Nav.Link>
                    <Nav.Link href="#">Programs</Nav.Link>
                </Nav>
                <NavDropdown title="User" id="nav-dropdown">
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        </div>
    );
}

export default NavbarApp;