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
                <NavLink to="/submitpost" style={{marginTop: "8px"}}>
                    Upload 
                </NavLink>
                <Nav.Item>
                <NavDropdown alignRight title="Profile" id="collasible-nav-dropdown">
                    <NavLink to="/profile" 
                    style={{display: "block", border: "1px solid black", padding: "0 15%", backgroundColor:"yellow"}}>View Profile</NavLink>
                    <NavLink to="/editprofile" style={{display: "block", border: "1px solid black", padding: "0 15%", backgroundColor:"yellow"}}>Edit Profile</NavLink>
                    <NavDropdown.Item onClick= {this.props.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav.Item>
            </Nav>
        );

        const guestLinks = (
            <Nav className="ml-auto" style={{border: "1px solid black", width: "8%", display: "flex", justifyContent: "space-around"}}>
                <NavLink to="/login">
                    Sign In 
                </NavLink>
                <NavLink to="/signup">
                    Sign Up
                </NavLink>
            </Nav>
        );
        return (
                <BNavbar expand="md" bg="light">
                    <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <BNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" style={{ width: "15%", display: "flex", justifyContent: "space-between"}}>
                            <NavLink to="/">
                                Home 
                            </NavLink>
                            <NavLink to="/photos">
                                Photos 
                            </NavLink>
                            <NavLink to="/videos">
                                Videos 
                            </NavLink>
                            <NavLink to="/audios">
                                Audio 
                            </NavLink>
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
