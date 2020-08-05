import React from "react"
import {Link, NavLink, withRouter} from "react-router-dom"

function Navbar(){
    return(
        <nav className="navbar">
            <ul className="nav-bar-home">
                <li className="nav-item"><NavLink to="/" style={{ textDecoration: "none"}}><span>Home</span></NavLink></li>
            </ul>
            <ul className="nav-links">    
                <li className="nav-item"><NavLink to="/profile" style={{ textDecoration: "none"}}><span>Profile</span></NavLink></li>
                <li className="nav-item"><NavLink to="/login" style={{ textDecoration: "none"}}><span>Sign in</span></NavLink></li>
                <li className="nav-item"><NavLink to="/signup" style={{ textDecoration: "none"}}><span>Sign up</span></NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;