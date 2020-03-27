import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Cookies from 'js-cookie';

import ProgramPage from '../ProgramPage/ProgramPage';
import CoursePage from '../CoursePage/CoursePage';

class Home extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: props.permission,
        }
        this.logout = this.logout.bind(this)
    }

    logout() {
        Cookies.remove('token');
        window.location.href='/';
    }

    render() {
        return(
            <div className="App">
                <Router>
                    <Navbar fixed="top" expand="lg">
                        <div className="app-name">
                            <Navbar.Brand href="/">ISEC</Navbar.Brand>
                        </div>
                        <Nav className="mr-auto">
                            <Nav.Link href="/courses">Courses</Nav.Link>
                            <Nav.Link href="/enrollprograms/5e7cd0babe742b001dbfaf83">Programs</Nav.Link>
                        </Nav>
                        <NavDropdown title="User" id="nav-dropdown">
                            <NavDropdown.Item href="/" onClick={this.logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>

                    <Switch>
                        {/* <Route path="/">
                            <h1>HOME</h1>
                        </Route> */}
                        {/* <Route path="/programs">
                            <ProgramPage id="5e7cd0babe742b001dbfaf83" permission={this.state.permission}/>
                        </Route> */}
                        <Route path="/enrollprograms/:program_id" component={ProgramPage} />
                        <Route path="/courses/:program_id/:course_id" component={CoursePage}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Home;