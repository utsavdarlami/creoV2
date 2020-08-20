import React, { Component } from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

class Navbar extends Component{
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    render(){
        const { isAuthenticated} = this.props.auth;

        const authLinks = (
            <ul className="nav-links">    
            <li className="nav-item"><NavLink to="/profile" style={{ textDecoration: "none"}}><span>Profile</span></NavLink></li>
            <li className="nav-item"><NavLink to="/posts" style={{ textDecoration: "none"}}><span>Upload</span></NavLink></li>
            <li className="nav-item"> <button onClick = {this.props.logout} className="logout-button">Logout</button></li>
        </ul>
        );

        const guestLinks = (
            <ul className="nav-links">    
            <li className="nav-item"><NavLink to="/login" style={{ textDecoration: "none"}}><span>Sign in</span></NavLink></li>
            <li className="nav-item"><NavLink to="/signup" style={{ textDecoration: "none"}}><span>Sign up</span></NavLink></li>
        </ul>
        );
        return(
            <nav className="navbar">
                <ul className="nav-bar-home">
                    <li className="nav-item"><NavLink to="/" style={{ textDecoration: "none"}}><span>Home</span></NavLink></li>
                </ul>
                { isAuthenticated? authLinks : guestLinks }
            </nav>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);