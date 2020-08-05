import React, {Component} from "react"
import axios from "axios";
import { withRouter } from "react-router-dom";

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
                    const { token } = res.data;
                    localStorage.setItem('token',token);
                    this.props.history.push("/");
                })
                .catch((err) =>{
                    console.log(err)
                })
                this.setState({
                    username: "",
                    email: "",
                    password: "",
                    confirmpassword: ""
                })
        }
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="form-component">
                    <h1>Sign up</h1>

                    <div className="form-input">
                        <label className="label-material">Username:
                            <input 
                            type="text" 
                            value={this.state.username}
                            placeholder=""
                            name="username"
                            onChange={this.handleChange} required  className="input-field-material"/>
                    </label>
                    </div>

                    <div className="form-input">
                    <label className="label-material">Email:
                        <input 
                            type="email"
                            value={this.state.email}
                            placeholder=""
                            name="email"
                            onChange={this.handleChange} required  className="input-field-material"/>
                    </label>
                    </div>


                    <div className="form-input">
                    <label className="label-material">Password:
                        <input
                            type="password"
                            value={this.state.password}
                            placeholder=""
                            name="password"
                            onChange={this.handleChange} required className="input-field-material" />
                    </label>
                    </div>

                    <div className="form-input">
                    <label className="label-material">Confirm Password:
                        <input 
                            type="password"
                            value={this.state.confirmpassword}
                            placeholder=""
                            name="confirmpassword"
                            onChange={this.handleChange} required className="input-field-material" />
                    </label>
                    </div>


                    <button className="submit-button">Submit</button>
            </form>

        {/* <h1>Username: {this.state.username}</h1>
        <h1>Email: {this.state.email}</h1>
        <h1>Password: {this.state.password}</h1>
        <h1>Confirm Password: {this.state.confirmpassword}</h1> */}
        
        </div>
        );
    }
}

export default withRouter(SignUpForm);