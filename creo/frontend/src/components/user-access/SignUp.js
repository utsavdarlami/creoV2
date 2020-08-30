import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";


class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            gender: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(){
        event.preventDefault(); 
        const { username, password, email, confirmpassword, gender} = this.state;
        if (password !== confirmpassword){
            alert("Passwords do not match")
        }
        else {
            const newUser = {
                username,
                password,
                email,
                gender
            }
            this.props.register(newUser)
        }
    }
    
    render(){
        if(this.props.isAuthenticated){
            return <Redirect to ="/" />
        }
        return(
            <div className="form-body">
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

                    <label>Gender:</label>
                    <div className="form-input">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={this.state.gender === "M"}
                                onChange={this.handleChange} /> Male
                        </label>
                    </div>

                    <div className="form-input">
                        <label>
                            <input 
                                type="radio"
                                name="gender"
                                value="F"
                                checked= {this.state.gender === "F"}
                                onChange={this.handleChange} /> Female
                        </label>
                    </div>

                    <div className="form-input">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="O"
                                checked = {this.state.gender === "O"}
                                onChange={this.handleChange} /> Other
                        </label>
                    </div>

                    <button className="submit-button">Submit</button>
                    <p>Already have an account?
                        <Link to="/login"><span style={{color:"#1db6e0"}}> Login</span></Link></p>
            </form>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(SignUp);