import React, {Component} from "react";
import axios from "axios";

//CHANGE THIS CODE TO MAKE IT LIKE PROFILE

class UserDetails extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            email: "",
            gender: "",
            portfoliosite: "",
            profilepic: "",
            resume: "",
            bio: ""
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

        axios.get("/api/profile", config)
        .then(res=>{
            const {gender, bio, portfoliosite, profilepic, resume} = res.data[0];
            const {username, email} = res.data[0].user;
            this.setState({
                gender: gender,
                username: username,
                email: email
            })
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    render(){
        return(
            <div  className="details-body">
                <p>Username: {this.state.username}</p>
                <p>Gender: {this.state.gender}</p>
            </div>
        );
    }
}

export default UserDetails;