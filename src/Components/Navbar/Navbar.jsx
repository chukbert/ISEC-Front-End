import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap'
import './Navbar.css';

function Navbar() {
    // eslint-disable-next-line no-unused-vars
    const [teacherList, setTeacherList] = useState(['Louis Cahyadi', 'Kevin Nathaniel Wijaya'])

    return (
        <div className="navbar">
            <Navbar>
                <Navbar.Brand href="#home">ISEC</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#">Courses</Nav.Link>
                    <Nav.Link href="#">Programs</Nav.Link>
                </Nav>
                <img
                    alt=""
                    src=""
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                <NavDropdown title="User" id="nav-dropdown">
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        </div>
    );
}

export default Navbar;