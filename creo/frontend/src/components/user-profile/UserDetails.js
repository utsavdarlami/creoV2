import React, {Component} from "react";
import axios from "axios";

class UserDetails extends Component{
    constructor(){
        super();
        this.state = {
            username:"",
            email: ""
        }
    }
    
    
    componentDidMount(){
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        if(token){
            config.headers["Authorization"] = `Token ${token}`;
        }

        axios.get("/api/auth/user", config)
        .then(res=>{
            console.log("User details done");
            console.log(res);
            const {username, email} = res.data;
            this.setState({
                username: username,
                email: email
            })
        })
        .catch((err) =>{
            // console.log(err);
        })
    }

    render(){
        return(
            <div  className="details-body">
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
            </div>
        );
    }
}

export default UserDetails;