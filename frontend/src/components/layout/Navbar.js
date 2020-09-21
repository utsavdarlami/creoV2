import React, { Component } from 'react';
//import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Navbar as BNavbar,NavDropdown,Nav} from 'react-bootstrap';


class Navbar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };

    //componentDidMou
    
    render() {
        //const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <Nav className="ml-auto">
                <Nav.Link href="/submitpost">
                    Upload 
                </Nav.Link>
                <Nav.Item>
                <NavDropdown alignRight title="Profile" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick= {this.props.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav.Item>
            </Nav>
        );

        const guestLinks = (
            <Nav className="ml-auto">
                <Nav.Link href="/login">
                    Sign In 
                </Nav.Link>
                <Nav.Link href="/signup">
                    Sign Up
                </Nav.Link>
            </Nav>
        );
        return (
                <BNavbar expand="md" bg="light">
                    <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <BNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">
                                Home 
                            </Nav.Link>
                            <Nav.Link href="/photos">
                                Photos 
                            </Nav.Link>
                            <Nav.Link href="/videos">
                                Videos 
                            </Nav.Link>
                            <Nav.Link href="/audio">
                                Audio 
                            </Nav.Link>
                        </Nav>
                        {this.props.auth.isAuthenticated ? authLinks : guestLinks}
                    </BNavbar.Collapse>
                </BNavbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
