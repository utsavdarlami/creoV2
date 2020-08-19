import React, {Component} from "react";
import { Link , Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit(){
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }
     
    
    render(){
        if(this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return(
            <div className="form-body">
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

                    <p>Don't have an account?
                        <Link to="/signup"><span style={{color:"#1db6e0"}}> Sign up</span></Link></p>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
