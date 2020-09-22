import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Button } from "react-bootstrap"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="access-form-display">
        <div className="access-lhs">
          <div className="access-text-block">
            <p>Join Creo!</p>
            <p>Browse art. Get inspired.</p>
          </div>
        </div>
        <div className="access-rhs">
          <h1 style={{ color: 'black', fontFamily: "'Josefin Sans', sans-serif"}}>Sign In</h1>
          <form className="access-form">
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
              required
              className="access-form-component"
            />

            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
              required
              className="access-form-component"
            />

          <Button variant="info" onClick={this.handleSubmit} style={{width: "25%", margin: "1%"}}>Login</Button>
            {/* <button className="access-submit-button">Sign In</button> */}

            <p style={{fontFamily: "'Josefin Sans', sans-serif"}}>
              Don't have an account?
              <Link to="/signup" style={{textDecoration: "none"}}>
                <span style={{ color: '#ea4c89', fontFamily: "'Josefin Sans', sans-serif" }}> Sign up </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
