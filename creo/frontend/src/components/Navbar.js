import React from "react"

function Navbar(){
    return(
        <nav>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/signup">Sign Up!</a></li>
                <li><a href="login">Log In</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;