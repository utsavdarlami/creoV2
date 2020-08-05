import React, {Component} from "react";
import axios from "axios";

class Logout extends Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleSubmit(){
        event.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        if(token){
            config.headers["Authorization"] = `Token ${token}`;
        }

        axios.post("/api/auth/logout", null, config)
        .then(res=>{
            console.log("Log out successful");
            localStorage.removeItem('token');
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="details-body">
                <button>Logout</button>
            </form>
        );
    }
}

export default Logout;