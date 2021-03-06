import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Cookies from 'js-cookie';

import ProgramPage from '../ProgramPage/ProgramPage';
import CoursePage from '../CoursePage/CoursePage';
import ListEnrolledProgram from '../ListEnrolledProgram/ListEnrolledProgram';
import ListProgram from '../ListProgram/ListProgram';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: props.permission,
            username: props.username
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
                            {/* <Nav.Link href="/courses">Courses</Nav.Link> */}
                            <Nav.Link href="/programs">Programs</Nav.Link>
                        </Nav>
                        <NavDropdown title={this.state.username} id="nav-dropdown">
                            <NavDropdown.Item href="/" onClick={this.logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>

                    <Switch>
                        {/* <Route path="/topic/:program_id/:course_id/:topic_id" component={TopicPage} */}
                        <Route path="/courses/:program_id/:course_id" component={CoursePage}/>
                        <Route path="/enrollprogram/:program_id" component={ProgramPage} />
                        <Route path="/programs" component={ListProgram} />
                        <Route path="/" component={ListEnrolledProgram} />
                    </Switch>
                </Router>
                
            </div>
        )
    }
}

export default Home;