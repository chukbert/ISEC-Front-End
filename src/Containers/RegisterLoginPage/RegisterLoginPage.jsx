import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Home from '../Home/Home.css';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

class RegisterLoginPage extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        // return(
        //     <div className="App">
        //         <Router>
        //             <Navbar fixed="top" expand="lg">
        //                 <div className="app-name">
        //                     <Navbar.Brand href="/">ISEC</Navbar.Brand>
        //                 </div>
        //                 {/* <Nav className="mr-auto">
        //                     <Nav.Link href="/">Sign In</Nav.Link>
        //                     <Nav.Link href="/register">Sign Up</Nav.Link>
        //                 </Nav> */}
        //             </Navbar>

        //             <Switch>
        //                 <Route exact path="/" component={LoginPage} />
        //                 <Route exact path="/register" component={RegisterPage}/>
        //             </Switch>
        //         </Router>
        //         <span>H</span>
        //     </div>
        // )
        return(
            <h1>Hello</h1>
        )
    }
}

export default RegisterLoginPage;