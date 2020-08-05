import React, { Profiler } from "react"
import Logout from "./Logout"
import UserDetails from "./UserDetails"

function Profile(){
    return(
        <div>
            <UserDetails />
            <Logout />
        </div>
    );
}

export default Profile;