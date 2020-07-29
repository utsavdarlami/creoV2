import React, {Component} from "react"
import axios from "axios";

class SignUpForm extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmpassword: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(){
        event.preventDefault();
        const {username, email, password, confirmpassword} = this.state;
        if (password != confirmpassword){
            alert("Passwords don't match");
        } else{
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                };
                const body = JSON.stringify({username, password, email});
                axios.post("/api/auth/register", body, config)
                .then ((res) => {
                    console.log(res)
                })
                .catch((err) =>{
                    console.log(err)
                })
        }
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    
                    <label>Username:
                        <input 
                            type="text" 
                            value={this.state.username}
                            placeholder="Username"
                            name="username"
                            onChange={this.handleChange} required />
                    </label>

                    <label>Email:
                        <input 
                            type="email"
                            value={this.state.email}
                            placeholder="Email"
                            name="email"
                            onChange={this.handleChange} required />
                    </label>

                    <label>Password:
                        <input
                            type="password"
                            value={this.state.password}
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange} required />
                    </label>

                    <label>Confirm Password:
                        <input 
                            type="password"
                            value={this.state.confirmpassword}
                            placeholder="Confrim Password"
                            name="confirmpassword"
                            onChange={this.handleChange} required />
                    </label>

                    <button>Submit</button>
            </form>

        <h1>Username: {this.state.username}</h1>
        <h1>Email: {this.state.email}</h1>
        <h1>Password: {this.state.password}</h1>
        <h1>Confirm Password: {this.state.confirmpassword}</h1>
        
        </div>
        );
    }
}

export default SignUpForm;