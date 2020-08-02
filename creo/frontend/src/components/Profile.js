import React, { Profiler } from "react"
import Logout from "./Logout"
import UserDetails from "./UserDetails"

function Profile(){
    return(
        <div>
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <UserDetails />
            <Logout />
        </div>
    );
}

export default Profile;