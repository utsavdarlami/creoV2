import React from "react"
import {Link, NavLink} from "react-router-dom"

function Navbar(){
    return(
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/signup">Sign Up!</NavLink></li>
                <li><NavLink to="/login">Log In</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;