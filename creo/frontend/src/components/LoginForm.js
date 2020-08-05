import React, {Component} from "react"
import axios from "axios";
import { withRouter } from "react-router-dom"

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
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
        const {username, password} = this.state;
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        const body = JSON.stringify({username, password});
        axios.post("/api/auth/login", body, config)
        .then ((res) => {
            console.log(res);
            const { token } = res.data;
            localStorage.setItem('token',token);
            this.props.history.push("/");
        })
        .catch((err) =>{
            console.log(err)
        })
        this.setState({
            username: "",
            password: ""
        })
        console.log("login");
}
     
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="form-component">
                    <h1>Sign in</h1> 
                    <div className="form-input">
                    <label className="label-material">Username:
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            placeholder = ""
                            onChange={this.handleChange} required className="input-field-material" />
                    </label>
                    </div>

                    <div className="form-input">
                    <label className="label-material">Password:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder=""
                            onChange = {this.handleChange} required className="input-field-material"/>
                    </label>
                    </div>

                    <button className="submit-button">Log In</button>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);